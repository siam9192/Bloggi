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

const AuthControllers = {
  handelSignUp,
  handelLogin,
};

export default AuthControllers;
