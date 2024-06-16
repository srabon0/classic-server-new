import { Schema, model } from 'mongoose';

import { TCategory } from './category.interface';

const CategorySchema = new Schema<TCategory>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    subCategories: [
      {
        name: String,
        isDeleted: {
          type: Boolean,
          default: false,
        },
      },
    ],

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

CategorySchema.statics.isCategoryExists = async function (id: string) {
  return this.findById(id);
};

const Category = model<TCategory>('category', CategorySchema);

export default Category;
