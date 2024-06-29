import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { userServices } from "./user.service";
const createUser = catchAsync(async (req, res) => {
  const userData = req.body;
  const result = await userServices.createUserInDB(userData);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "User registered successfully",
    data: result,
  });
});

const getMe = catchAsync(async (req, res) => {
  const email = req?.user?.email;
  const result = await userServices.getUserFromDB(email);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User profile retrieved successfully",
    data: result,
  });
});

const updateMe = catchAsync(async (req, res) => {
  const email = req.user.email;

  const result = await userServices.updateUserInDB(email, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Profile updated successfully",
    data: result,
  });
});

export const UserController = {
  getMe,
  createUser,
  updateMe,
};
