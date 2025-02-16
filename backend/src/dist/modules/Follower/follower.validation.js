"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const CreateFollowerValidation = zod_1.z.object({
    author_id: zod_1.z.number(),
});
const ChangeFollowerStatusValidation = zod_1.z.object({
    reader_id: zod_1.z.number(),
    status: zod_1.z.nativeEnum(client_1.FollowerStatus),
});
const FollowerValidations = {
    CreateFollowerValidation,
    ChangeFollowerStatusValidation,
};
exports.default = FollowerValidations;
