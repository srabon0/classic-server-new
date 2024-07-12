/* eslint-disable @typescript-eslint/no-explicit-any */

import Brand from '../brand/brand.model';
import Category from '../category/category.model';
import { Product } from '../product/product.model';

const getAllCount = async () => {
  const brandResult = await Brand.countDocuments();
  const productResult = await Product.countDocuments();
  const categoryResult = await Category.countDocuments();
  const totalCounts = {
    brands: brandResult || 0,
    products: productResult || 0,
    categories: categoryResult || 0,
  };
  return totalCounts;
};

export const DashBoardServices = {
  getAllCount,
};
