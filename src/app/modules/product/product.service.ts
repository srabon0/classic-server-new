import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { UploadController } from '../file/file.controller';
import { productSearchableFields } from './product.constant';
import { TProduct } from './product.interface';
import { Product } from './product.model';

const getAllProductsFromDb = async (query: Record<string, unknown>) => {
  /*
  const queryObj = { ...query }; // copying req.query object so that we can mutate the copy object 
   
  let searchTerm = '';   // SET DEFAULT VALUE 

  // IF searchTerm  IS GIVEN SET IT
  if (query?.searchTerm) {
    searchTerm = query?.searchTerm as string; 
  }

  
 // HOW OUR FORMAT SHOULD BE FOR PARTIAL MATCH  : 
  { email: { $regex : query.searchTerm , $options: i}}
  { presentAddress: { $regex : query.searchTerm , $options: i}}
  { 'name.firstName': { $regex : query.searchTerm , $options: i}}

  
  // WE ARE DYNAMICALLY DOING IT USING LOOP
   const searchQuery = Student.find({
     $or: studentSearchableFields.map((field) => ({
       [field]: { $regex: searchTerm, $options: 'i' },
    })),
   });

  
   // FILTERING fUNCTIONALITY:
  
  const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
   excludeFields.forEach((el) => delete queryObj[el]);  // DELETING THE FIELDS SO THAT IT CAN'T MATCH OR FILTER EXACTLY

  const filterQuery = searchQuery
    .find(queryObj)
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });

 
  // SORTING FUNCTIONALITY:
  
  let sort = '-createdAt'; // SET DEFAULT VALUE 
 
 // IF sort  IS GIVEN SET IT
  
   if (query.sort) {
    sort = query.sort as string;
  }

   const sortQuery = filterQuery.sort(sort);


   // PAGINATION FUNCTIONALITY:

   let page = 1; // SET DEFAULT VALUE FOR PAGE 
   let limit = 1; // SET DEFAULT VALUE FOR LIMIT 
   let skip = 0; // SET DEFAULT VALUE FOR SKIP


  // IF limit IS GIVEN SET IT
  
  if (query.limit) {
    limit = Number(query.limit);
  }

  // IF page IS GIVEN SET IT

  if (query.page) {
    page = Number(query.page);
    skip = (page - 1) * limit;
  }

  const paginateQuery = sortQuery.skip(skip);

  const limitQuery = paginateQuery.limit(limit);

  
  
  // FIELDS LIMITING FUNCTIONALITY:

  // HOW OUR FORMAT SHOULD BE FOR PARTIAL MATCH 

  fields: 'name,email'; // WE ARE ACCEPTING FROM REQUEST
  fields: 'name email'; // HOW IT SHOULD BE 

  let fields = '-__v'; // SET DEFAULT VALUE

  if (query.fields) {
    fields = (query.fields as string).split(',').join(' ');

  }

  const fieldQuery = await limitQuery.select(fields);

  return fieldQuery;

  */

  const studentQuery = new QueryBuilder(
    Product.find().populate('brand').populate('category'),
    query,
  )
    .search(productSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await studentQuery.modelQuery;
  return result;
};

const getSingleProductFromDB = async (id: string) => {
  const result = await Product.findById(id);
  return result;
};

const updateProductIntoDB = async (id: string, payload: Partial<TProduct>) => {
  const {
    title,
    code,
    unit,
    description,
    category,
    subCategory,
    brand,
    cartoncapacity,
    model,
    image,
    price,
    tags,
    status,
    ...remainingProductData
  } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingProductData,
  };

  if (title) {
    modifiedUpdatedData['title'] = title;
  }

  if (code) {
    modifiedUpdatedData['code'] = code;
  }

  if (unit) {
    modifiedUpdatedData['unit'] = unit;
  }

  if (description) {
    modifiedUpdatedData['description'] = description;
  }

  if (category) {
    modifiedUpdatedData['category'] = category;
  }

  if (subCategory) {
    modifiedUpdatedData['subCategory'] = subCategory;
  }

  if (brand) {
    modifiedUpdatedData['brand'] = brand;
  }

  if (cartoncapacity) {
    modifiedUpdatedData['cartoncapacity'] = cartoncapacity;
  }

  if (model) {
    modifiedUpdatedData['model'] = model;
  }

  if (image && image.length) {
    modifiedUpdatedData['image'] = image;
  }

  if (price) {
    modifiedUpdatedData['price'] = price;
  }

  if (tags && tags.length) {
    modifiedUpdatedData['tags'] = tags;
  }

  if (status) {
    modifiedUpdatedData['status'] = status;
  }

  const result = await Product.findByIdAndUpdate(id, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteProductFromDB = async (id: string) => {
  const result = await Product.findByIdAndDelete(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product not found');
  }
  if (result?.image?.length) {
    UploadController.deleteFolder(result?.image[0]?.folder as string);
  }

  return result;
};

const createProductIntoDB = async (payload: TProduct) => {
  const result = await Product.create(payload);
  return result;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const deleteImageFromDB = async (productId: string, image: any) => {
  const imageIdToRemove = image._id;
  const result = await Product.findByIdAndUpdate(
    productId,
    { $pull: { image: { _id: imageIdToRemove } } },
    { new: true },
  );
  //remove file from disk

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product not found');
  }

  const fileDeleted = await UploadController.deleteImage(image);
  if (!fileDeleted) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Image not deleted');
  }

  return result;
};

const searchProductFromDB = async (query: Record<string, unknown>) => {
  const result = await Product.find({
    $or: productSearchableFields.map((field) => ({
      [field]: { $regex: query.searchKey, $options: 'i' },
    })),
  })
    .populate('brand')
    .populate('category');
  return { products: result };
};

const getLatestProductsFromDB = async () => {
  const result = await Product.find({})
    .sort({ createdAt: -1 })
    .limit(5)
    .populate('brand')
    .populate('category');
  return result;
};

const getSliderProductsFromDB = async () => {
  const result = await Product.aggregate([
    { $sample: { size: 10 } }, // Randomly select 10 documents
    {
      $lookup: {
        from: 'brands', // Assuming 'brands' is the collection name
        localField: 'brand', // Field in the products collection
        foreignField: '_id', // Field in the brands collection
        as: 'brand', // Where to put the joined documents
      },
    },
    {
      $lookup: {
        from: 'categories', // Assuming 'categories' is the collection name
        localField: 'category', // Field in the products collection
        foreignField: '_id', // Field in the categories collection
        as: 'category', // Where to put the joined documents
      },
    },
    {
      $unwind: '$brand', // Convert brand array to object
    },
    {
      $unwind: '$category', // Convert category array to object
    },
  ]);

  return result;
};

export const ProductServices = {
  getAllProductsFromDb,
  getSingleProductFromDB,
  updateProductIntoDB,
  deleteProductFromDB,
  createProductIntoDB,
  deleteImageFromDB,
  searchProductFromDB,
  getLatestProductsFromDB,
  getSliderProductsFromDB,
};
