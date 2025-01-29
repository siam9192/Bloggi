import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import httpStatus from "../../shared/http-status";
import { sendSuccessResponse } from "../../shared/response";
import FollowerServices from "./follower.service";
import Pick from "../../utils/pick";
import { paginationOptionKeys } from "../../utils/constant";

const createFollower = catchAsync(async (req: Request, res: Response) => {
  const result = await FollowerServices.createFollowerInto(req.user, req.body);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Follower created successfully",
    data: result,
  });
});

const deleteFollower = catchAsync(async (req: Request, res: Response) => {
  const result = await FollowerServices.deleteFollowerFromDB(
    req.user,
    req.params.authorId,
  );
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Follower deleted successfully",
    data: result,
  });
});

const getAuthorFollowers = catchAsync(async (req: Request, res: Response) => {
  const filterData = Pick(req.query, ["name"]);
  const paginationOptions = Pick(req.query, paginationOptionKeys);
  const result = await FollowerServices.getAuthorFollowersFromDB(
    req.params.authorId,
    filterData,
    paginationOptions as any,
  );
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Followers retrieved successfully",
    ...result,
  });
});

const getMyFollowers = catchAsync(async (req: Request, res: Response) => {
  const filterData = Pick(req.query, ["name"]);
  const paginationOptions = Pick(req.query, paginationOptionKeys);
  const result = await FollowerServices.getMyFollowersFromDB(
    req.user,
    filterData,
    paginationOptions as any,
  );
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: "Followers retrieved successfully",
    ...result,
  });
});

const getMyFollowingAuthors = catchAsync(
  async (req: Request, res: Response) => {
    const paginationOptions = Pick(req.query, paginationOptionKeys);
    const result = await FollowerServices.getMyFollowingAuthorsFromDB(
      req.user,
      paginationOptions as any,
    );
    sendSuccessResponse(res, {
      statusCode: httpStatus.OK,
      message: "Following authors retrieved successfully",
      ...result,
    });
  },
);

const FollowerControllers = {
  createFollower,
  deleteFollower,
  getAuthorFollowers,
  getMyFollowers,
  getMyFollowingAuthors,
};

export default FollowerControllers;
