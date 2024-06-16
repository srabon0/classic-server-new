import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BrandServices } from './brand.service';

const getAllBrands = catchAsync(async (req, res) => {
  const result = await BrandServices.getAllBrandsFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Brands are retrieved succesfully',
    data: result,
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
