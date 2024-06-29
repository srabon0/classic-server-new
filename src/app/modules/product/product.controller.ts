import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { Product } from './product.model';
import { ProductServices } from './product.service';

const getSingleProduct = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ProductServices.getSingleProductFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product is retrieved succesfully',
    data: result,
  });
});

const getAllProducts: RequestHandler = catchAsync(async (req, res) => {
  const result = await ProductServices.getAllProductsFromDb(req.query);
  const totalCounts = await Product.countDocuments();
  const meta = {
    totalCounts: totalCounts || 0,
    totalPages: Math.ceil(totalCounts / Number(req?.query?.limit)) || 1,
    page: Number(req.query.page || 1),
    limit: Number(req.query.limit || 10),
  };

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product are retrieved succesfully',
    data: {
      data: result,
      meta,
    },
  });
});

const updateProduct = catchAsync(async (req, res) => {
  const { id } = req.params;
  const product = req.body;
  const result = await ProductServices.updateProductIntoDB(id, product);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product is updated succesfully',
    data: result,
  });
});

const deleteProduct = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ProductServices.deleteProductFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product is deleted succesfully',
    data: result,
  });
});

const createProduct = catchAsync(async (req, res) => {
  const product = req.body;
  const result = await ProductServices.createProductIntoDB(product);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Product is created succesfully',
    data: result,
  });
});

const deleteImage = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const result = await ProductServices.deleteImageFromDB(productId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Image is deleted succesfully',
    data: result,
  });
});

const searchProduct = catchAsync(async (req, res) => {
  const result = await ProductServices.searchProductFromDB({
    searchKey: req?.body?.search,
  });
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product is retrieved succesfully',
    data: result,
  });
});

const getLatestProducts = catchAsync(async (req, res) => {
  const result = await ProductServices.getLatestProductsFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product is retrieved succesfully',
    data: result,
  });
});

const getSliderProducts = catchAsync(async (req, res) => {
  const result = await ProductServices.getSliderProductsFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product is retrieved succesfully',
    data: result,
  });
});

export const ProductControllers = {
  getSingleProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  createProduct,
  deleteImage,
  searchProduct,
  getLatestProducts,
  getSliderProducts,
};
