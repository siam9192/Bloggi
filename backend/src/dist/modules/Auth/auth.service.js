"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const AppError_1 = __importDefault(require("../../Errors/AppError"));
const http_status_1 = __importDefault(require("../../shared/http-status"));
const prisma_1 = __importDefault(require("../../shared/prisma"));
const bycrypt_1 = require("../../utils/bycrypt");
const jwtHelpers_1 = __importDefault(require("../../shared/jwtHelpers"));
const config_1 = __importDefault(require("../../config"));
const ejs_1 = __importDefault(require("ejs"));
const path_1 = __importDefault(require("path"));
const node_mailer_service_1 = __importDefault(require("../NodeMailer/node-mailer.service"));
const SignUp = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.default.user.findFirst({
        where: {
            email: data.email,
        },
    });
    //  Check user existence
    if (user) {
        throw new AppError_1.default(http_status_1.default.NOT_ACCEPTABLE, "User us already exist on this email");
    }
    const hashPassword = yield (0, bycrypt_1.bcryptHash)(data.password);
    const result = yield prisma_1.default.$transaction((trClient) => __awaiter(void 0, void 0, void 0, function* () {
        const userData = {
            role: client_1.UserRole.Reader,
            email: data.email,
            password: hashPassword,
            provider: client_1.Provider.Email,
        };
        //   Create user
        const userCreatedData = yield trClient.user.create({ data: userData });
        const userProfile = Object.assign(Object.assign({}, data.name), { user_id: userCreatedData.id });
        //  Create the user(Reader) profile
        const userCreatedProfile = yield trClient.reader.create({
            data: userProfile,
        });
        return Object.assign(Object.assign({}, userCreatedData), { profile: userCreatedProfile });
    }));
    return result;
});
const Login = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.default.user.findFirst({
        where: {
            email: data.email,
        },
        include: {
            reader: true,
            author: true,
            staff: true,
        },
    });
    // Checking user existence
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Account not found");
    }
    // Comparing password
    const isMatched = yield (0, bycrypt_1.bcryptCompare)(data.password, user.password);
    // Checking is password correct
    if (!isMatched) {
        throw new AppError_1.default(http_status_1.default.NOT_ACCEPTABLE, "Wrong password");
    }
    const tokenPayload = {
        id: user.id,
        role: user.role,
    };
    if (user.role === client_1.UserRole.Reader) {
        tokenPayload.readerId = user.reader.id;
    }
    else if (user.role === client_1.UserRole.Author) {
        tokenPayload.authorId = user.author.id;
    }
    else {
        tokenPayload.staffId = user.staff.id;
    }
    // Generating access token
    const accessToken = yield jwtHelpers_1.default.generateToken(tokenPayload, config_1.default.jwt.access_secret, "30d");
    // Generating refresh token
    const refreshToken = yield jwtHelpers_1.default.generateToken(tokenPayload, config_1.default.jwt.refresh_token_secret, config_1.default.jwt.refresh_token_expire_time);
    return {
        accessToken,
        refreshToken,
    };
});
const getAccessTokenUsingRefreshToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const refreshToken = req.cookies.refreshToken;
    try {
        if (!refreshToken) {
            throw new Error();
        }
        const decode = jwtHelpers_1.default.verifyToken(refreshToken, config_1.default.jwt.refresh_token_secret);
        if (!decode)
            throw new Error();
        return {
            refreshToken,
        };
    }
    catch (error) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "BAD😒 request!");
    }
});
const changePassword = (authUser, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.default.user.findUnique({
        where: {
            id: authUser.id,
        },
    });
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    const isMatched = yield (0, bycrypt_1.bcryptCompare)(payload.oldPassword, payload.newPassword);
    if (isMatched) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Wrong  password");
    }
    const hashedNewPassword = yield (0, bycrypt_1.bcryptHash)(payload.newPassword);
    yield prisma_1.default.user.update({
        where: {
            id: authUser.id,
        },
        data: {
            password: hashedNewPassword,
        },
    });
    return null;
});
const forgetPassword = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.default.user.findFirst({
        where: {
            email,
        },
    });
    if (!user)
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "No user found");
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 6);
    const session = yield prisma_1.default.passwordResetRequest.create({
        data: {
            userId: user.id,
            expiresAt,
        },
    });
    const tokenPayload = {
        sessionId: session.id,
        userId: user.id,
        email,
    };
    const token = jwtHelpers_1.default.generateToken(tokenPayload, config_1.default.jwt.reset_password_token_secret, config_1.default.jwt.reset_password_token_expire_time);
    const resetLink = `${config_1.default.origin}/reset-password/${token}`;
    yield ejs_1.default.renderFile(path_1.default.join(process.cwd(), "/src/app/templates/reset-password-email.ejs"), { link: resetLink }, function (err, template) {
        return __awaiter(this, void 0, void 0, function* () {
            if (err) {
                throw new AppError_1.default(400, "Something went wrong");
            }
            else {
                yield node_mailer_service_1.default.sendEmail({
                    emailAddress: email,
                    subject: "Password reset link",
                    template,
                });
            }
        });
    });
    return null;
});
const resetPassword = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    let decode;
    try {
        decode = (yield jwtHelpers_1.default.verifyToken(payload.token, config_1.default.jwt.reset_password_token_secret));
        if (!decode)
            throw new Error();
        const session = yield prisma_1.default.passwordResetRequest.findUnique({
            where: {
                id: decode.sessionId,
                expiresAt: {
                    gt: new Date(),
                },
                isUsed: false,
            },
        });
        if (!session)
            throw new Error();
    }
    catch (error) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Sorry maybe reset link expired,used or something wrong");
    }
    const hashedNewPassword = yield (0, bycrypt_1.bcryptHash)(payload.newPassword);
    yield prisma_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        yield tx.user.update({
            where: {
                id: decode.userId,
            },
            data: {
                password: hashedNewPassword,
                passwordChangedAt: new Date(),
            },
        });
        yield tx.passwordResetRequest.update({
            where: {
                id: decode.sessionId,
            },
            data: {
                isUsed: true,
            },
        });
    }));
    return null;
});
const getMeFromDB = (authUser) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.default.user.findUnique({
        where: {
            id: authUser.id,
        },
        select: {
            id: true,
            role: true,
            email: true,
            google_id: true,
            provider: true,
            status: true,
            reader: true,
            author: {
                include: {
                    social_links: true,
                },
            },
            staff: true,
            passwordChangedAt: true,
            join_date: true,
            updated_at: true,
        },
    });
    return user;
});
const AuthServices = {
    SignUp,
    Login,
    getAccessTokenUsingRefreshToken,
    changePassword,
    forgetPassword,
    resetPassword,
    getMeFromDB,
};
exports.default = AuthServices;
