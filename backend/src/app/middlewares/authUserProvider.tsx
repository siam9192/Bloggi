import { NextFunction, Request, Response } from "express";
import catchAsync from "../shared/catchAsync";
import AppError from "../Errors/AppError";
import httpStatus from "../shared/http-status";
import config from "../config";
import jwtHelpers from "../shared/jwtHelpers";
import { JwtPayload } from "jsonwebtoken";
import prisma from "../shared/prisma";
import { UserRole } from "@prisma/client";

const AuthUserProvider =  ()=>{
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization?.replace("Bearer ", "");
        // checking if the token is missing
        if (!token) {
         return next()
        }
    
        // checking if the given token is valid
        let decoded;
        try {
          decoded = jwtHelpers.verifyToken(
            token,
            config.jwt.access_secret as string,
          ) as JwtPayload;
        } catch (error) {
          throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized");
        }
    
        const { role, id, iat } = decoded;
    
        // checking if the user is exist
        const user = await prisma.user.findUnique({
          where: {
            id,
          },
        });
    
        if (!user) {
          throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
        }
        // checking if the user is already deleted
        if (user.status === "Deleted") {
          throw new AppError(httpStatus.FORBIDDEN, "This user is deleted ! !");
        }
    
        // checking if the user is blocked
    
        if (user.status === "Blocked") {
          throw new AppError(httpStatus.FORBIDDEN, "This user is blocked ! !");
        }
    
        req.user = decoded as { id: number; role: UserRole };
    
        next();
      });
}


export default AuthUserProvider