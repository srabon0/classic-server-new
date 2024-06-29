import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import AppError from '../errors/AppError';

import { TUserRole } from '../modules/User/user.interface';
import { User } from '../modules/User/user.model';
import catchAsync from '../utils/catchAsync';
import sendResponse from '../utils/sendResponse';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const bearer = req.headers.authorization;
    const token = bearer?.split(' ')[1];

    // checking if the token is missing
    if (!token) {
      throw new AppError(httpStatus.NOT_FOUND, 'Token not found');
    }

    // checking if the given token is valid
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;

    const { role, userId } = decoded;

    // checking if the user is exist
    const user = await User.findById({ _id: userId });

    if (!user) {
      if (requiredRoles && !requiredRoles.includes(role)) {
        sendResponse(res, {
          success: false,
          statusCode: httpStatus.NOT_FOUND,
          message: 'User not found',
        });
      }
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      sendResponse(res, {
        success: false,
        statusCode: httpStatus.UNAUTHORIZED,
        message: 'You have no access to this route',
      });
    }

    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
