/* eslint-disable @typescript-eslint/no-explicit-any */

import httpStatus from 'http-status';

import AppError from '../../errors/AppError';
import { IUser } from './user.interface';
import { User } from './user.model';

const createUserInDB = async (payload: IUser) => {
  try {
    const newUser = await User.create(payload);

    //create a user
    if (!newUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    return newUser;
  } catch (err: any) {
    throw new Error(err);
  }
};

const getUserFromDB = async (email: string) => {
  const result = await User.findOne({ email }).select('-password');
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }
  return result;
};

const updateUserInDB = async (email: string, payload: Partial<IUser>) => {
  const result = await User.findOneAndUpdate(
    {
      email,
    },
    {
      $set: payload,
    },
    {
      new: true,
    },
  ).select('-password');
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }
  return result;
};

export const userServices = {
  createUserInDB,
  getUserFromDB,
  updateUserInDB,
};
