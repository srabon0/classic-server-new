import { Types } from 'mongoose';

type TImage = {
  fieldName: string;
  originalName: string;
  encoding: string;
  mimeType: string;
  imageUrl: string;
  size: number;
  destination: string;
  filename: string;
  path: string;
  folder: string;
};

type TProductStatus = 'active' | 'inactive' | 'deleted';

export type TProduct = {
  title: string;
  code: string;
  unit?: string;
  description?: string;
  category: Types.ObjectId;
  subCategory?: string;
  brand: Types.ObjectId;
  cartoncapacity: number;
  model?: string;
  image: TImage[];
  price?: number;
  tags?: string[];
  status: TProductStatus;
};
