import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import AuthServices from "./auth.service";
import { sendSuccessResponse } from "../../shared/response";
import httpStatus from "../../shared/http-status";

const handelSignUp = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.SignUp(req.body);
  sendSuccessResponse(res, {
    statusCode: httpStatus.CREATED,
    message: "Sign up successful",
    data: result,
  });
});

const handelLogin = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.Login(req.body);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Login successful",
    data: result,
  });
});

const changePassword = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.changePassword(req.user, req.body);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Password changed successfully",
    data: result,
  });
});

const forgetPassword = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.forgetPassword(req.params.email);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Check your mailbox",
    data: result,
  });
});

const getAccessTokenUsingRefreshToken = catchAsync(
  async (req: Request, res: Response) => {
    const result = await AuthServices.getAccessTokenUsingRefreshToken(req, res);
    sendSuccessResponse(res, {
      statusCode: httpStatus.OK,
      message: "Access token retrieved successfully",
      data: result,
    });
  },
);

const resetPassword = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.resetPassword(req.body);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Password reset successful",
    data: result,
  });
});

const getMe = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.getMeFromDB(req.user);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Current User retrieved successfully",
    data: result,
  });
});

const AuthControllers = {
  handelSignUp,
  handelLogin,
  getAccessTokenUsingRefreshToken,
  changePassword,
  forgetPassword,
  resetPassword,
  getMe,
};

export default AuthControllers;
