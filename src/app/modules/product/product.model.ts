import { Schema, model } from 'mongoose';

const status = Object.freeze({
  active: 'active',
  inactive: 'inactive',
  deleted: 'deleted',
});

const ProductSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    unit: {
      type: String,
      default: 'pcs',
    },
    description: {
      type: String,
    },
    category: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'category',
    },
    subCategory: {
      type: String,
    },
    brand: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'brand',
    },
    cartoncapacity: {
      type: Number,
      required: true,
    },
    model: {
      type: String,
    },
    image: [
      {
        fieldName: String,
        originalName: String,
        encoding: String,
        mimeType: String,
        imageUrl: String,
        size: Number,
        destination: String,
        filename: String,
        path: String,
        folder: String,
      },
    ],
    price: {
      type: Number,
    },
    tags: [
      {
        type: String,
        required: false,
      },
    ],
    status: {
      type: String,
      enum: Object.values(status),
      default: status.active,
    },
    isSliderProduct: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export const Product = model('product', ProductSchema);
