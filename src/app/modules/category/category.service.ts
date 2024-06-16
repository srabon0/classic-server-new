/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { CategorySearchableFields } from './category.constant';
import { TCategory } from './category.interface';
import Category from './category.model';

const getSingleCategoryFromDB = async (id: string) => {
  const result = await Category.findById(id);
  return result;
};

const updateCategoryIntoDB = async (
  id: string,
  payload: Partial<TCategory>,
) => {
  const { name, description, subCategories, ...remainingCategoryData } =
    payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingCategoryData,
  };

  if (name) {
    modifiedUpdatedData['name'] = name;
  }

  if (description) {
    modifiedUpdatedData['description'] = description;
  }

  if (subCategories) {
    modifiedUpdatedData['subCategories'] = subCategories;
  }

  const updatedCategory = await Category.findByIdAndUpdate(
    id,
    modifiedUpdatedData,
    {
      new: true,
    },
  );

  if (!updatedCategory) {
    throw new AppError(httpStatus.NOT_FOUND, 'Category not found');
  }

  return updatedCategory;
};

const deleteCategoryFromDB = async (id: string) => {
  const updatedCategory = await Category.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );

  if (!updatedCategory) {
    throw new AppError(httpStatus.NOT_FOUND, 'Category not found');
  }

  return updatedCategory;
};

const getAllCategorysFromDB = async (query: Record<string, unknown>) => {
  const CategoryQuery = new QueryBuilder(Category.find(), query)
    .search(CategorySearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await CategoryQuery.modelQuery;
  return result;
};

const createCategoryInDB = async (payload: TCategory) => {
  const category = new Category(payload);
  const result = await category.save();
  return result;
};

export const CategoryServices = {
  getAllCategorysFromDB,
  getSingleCategoryFromDB,
  updateCategoryIntoDB,
  deleteCategoryFromDB,
  createCategoryInDB,
};
