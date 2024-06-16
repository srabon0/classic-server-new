import { Schema, model } from 'mongoose';

import { TBrand } from './brand.interface';

const BrandSchema = new Schema<TBrand>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const Brand = model<TBrand>('brand', BrandSchema);

export default Brand;
