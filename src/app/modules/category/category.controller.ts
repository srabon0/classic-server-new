import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import Category from './category.model';
import { CategoryServices } from './category.service';

const getAllCategorys: RequestHandler = catchAsync(async (req, res) => {
  const result = await CategoryServices.getAllCategorysFromDB(req.query);
  const totalCounts = await Category.countDocuments();
  const meta = {
    totalCounts: totalCounts || 0,
    totalPages: Math.ceil(totalCounts / Number(req?.query?.limit)) || 1,
    page: Number(req.query.page || 1),
    limit: Number(req.query.limit || 10),
  };

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Categorys are retrieved succesfully',
    data: {
      data: result,
      meta,
    },
  });
});
const getSingleCategory = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CategoryServices.getSingleCategoryFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category is retrieved succesfully',
    data: result,
  });
});

const updateCategory = catchAsync(async (req, res) => {
  const { id } = req.params;
  const category = req.body;
  const result = await CategoryServices.updateCategoryIntoDB(id, category);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category is updated succesfully',
    data: result,
  });
});

const deleteCategory = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CategoryServices.deleteCategoryFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category is deleted succesfully',
    data: result,
  });
});

const createCategory = catchAsync(async (req, res) => {
  const category = req.body;
  const result = await CategoryServices.createCategoryInDB(category);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Category is created succesfully',
    data: result,
  });
});

export const CategoryControllers = {
  getAllCategorys,
  getSingleCategory,
  updateCategory,
  deleteCategory,
  createCategory,
};
