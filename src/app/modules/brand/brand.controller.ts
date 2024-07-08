import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import Brand from './brand.model';
import { BrandServices } from './brand.service';

const getAllBrands: RequestHandler = catchAsync(async (req, res) => {
  const result = await BrandServices.getAllBrandsFromDB(req.query);
  const totalCounts = await Brand.countDocuments();
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

const getSingleBrand = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BrandServices.getSingleBrandFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Brand is retrieved succesfully',
    data: result,
  });
});

const updateBrand = catchAsync(async (req, res) => {
  const { id } = req.params;
  const brand = req.body;
  const result = await BrandServices.updateBrandIntoDB(id, brand);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Brand is updated succesfully',
    data: result,
  });
});

const deleteBrand = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BrandServices.deleteBrandFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Brand is deleted succesfully',
    data: result,
  });
});

const createBrand = catchAsync(async (req, res) => {
  const brand = req.body;
  const result = await BrandServices.createBrandInDB(brand);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Brand is created succesfully',
    data: result,
  });
});

export const BrandControllers = {
  getAllBrands,
  getSingleBrand,
  updateBrand,
  deleteBrand,
  createBrand,
};
