/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { BrandSearchableFields } from './brand.constant';
import { TBrand } from './brand.interface';
import Brand from './brand.model';

const getSingleBrandFromDB = async (id: string) => {
  const result = await Brand.findById(id).populate('academicDepartment');
  return result;
};

const updateBrandIntoDB = async (id: string, payload: Partial<TBrand>) => {
  const { name, description, ...remainingBrandData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingBrandData,
  };

  if (name) {
    modifiedUpdatedData['name'] = name;
  }

  if (description) {
    modifiedUpdatedData['description'] = description;
  }

  const updatedBrand = await Brand.findByIdAndUpdate(id, modifiedUpdatedData, {
    new: true,
  });

  if (!updatedBrand) {
    throw new AppError(httpStatus.NOT_FOUND, 'Brand not found');
  }

  return updatedBrand;
};

const deleteBrandFromDB = async (id: string) => {
  const updatedBrand = await Brand.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );

  if (!updatedBrand) {
    throw new AppError(httpStatus.NOT_FOUND, 'Brand not found');
  }

  return updatedBrand;
};

const getAllBrandsFromDB = async (query: Record<string, unknown>) => {
  const brandQuery = new QueryBuilder(Brand.find(), query)
    .search(BrandSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await brandQuery.modelQuery;
  return result;
};

const createBrandInDB = async (payload: TBrand) => {
  console.log(payload, 'brand');
  const brand = new Brand(payload);
  const result = await brand.save();
  return result;
};

export const BrandServices = {
  getAllBrandsFromDB,
  getSingleBrandFromDB,
  updateBrandIntoDB,
  deleteBrandFromDB,
  createBrandInDB,
};
