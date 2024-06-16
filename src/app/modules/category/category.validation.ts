import { z } from 'zod';

const subCategoryValidationSchema = z.object({
  name: z.string().optional(),
});

const imageValidationSchema = z.object({
  fieldName: z.string().optional(),
  originalName: z.string().optional(),
  encoding: z.string().optional(),
  mimeType: z.string().optional(),
  imageUrl: z.string().url().optional(),
  size: z.number().optional(),
  destination: z.string().optional(),
  filename: z.string().optional(),
  path: z.string().optional(),
  folder: z.string().optional(),
});

const createCategoryValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    description: z.string().optional(),
    subCategories: z.array(subCategoryValidationSchema).optional(),
    image: imageValidationSchema.optional(),
  }),
});

const updateCategoryValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    subCategories: z.array(subCategoryValidationSchema).optional(),
    image: imageValidationSchema.optional(),
  }),
});

export const categoryValidations = {
  createCategoryValidationSchema,
  updateCategoryValidationSchema,
};
