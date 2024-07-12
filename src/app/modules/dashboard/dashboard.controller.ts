import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { DashBoardServices } from './dashboard.service';

const getDashboardCounts: RequestHandler = catchAsync(async (req, res) => {
  const result = await DashBoardServices.getAllCount();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Categorys are retrieved succesfully',
    data: result,
  });
});

export const DashboardControllers = {
  getDashboardCounts,
};
