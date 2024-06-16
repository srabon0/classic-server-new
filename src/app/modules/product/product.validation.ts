import { z } from 'zod';

const createImageValidationSchema = z.object({
  fieldName: z.string().optional(),
  originalName: z.string().optional(),
  encoding: z.string().optional(),
  mimeType: z.string().optional(),
  imageUrl: z.string().optional(),
  size: z.number().optional(),
  destination: z.string().optional(),
  filename: z.string().optional(),
  path: z.string().optional(),
  folder: z.string().optional(),
});

const createProductValidationSchema = z.object({
  body: z.object({
    title: z.string().min(1),
    code: z.string().optional(),
    unit: z.string().default('pcs'),
    description: z.string().optional(),
    category: z.string().min(1), // Assuming category is an ObjectId in string format
    subCategory: z.string().optional(),
    brand: z.string().min(1), // Assuming brand is an ObjectId in string format
    cartoncapacity: z.number(),
    model: z.string().optional(),
    image: z.array(createImageValidationSchema).optional(),
    price: z.number().optional(),
    tags: z.array(z.string()).optional(),
    status: z.enum(['active', 'inactive', 'deleted']).default('active'),
  }),
});

const updateImageValidationSchema = z.object({
  fieldName: z.string().optional(),
  originalName: z.string().optional(),
  encoding: z.string().optional(),
  mimeType: z.string().optional(),
  imageUrl: z.string().optional(),
  size: z.number().optional(),
  destination: z.string().optional(),
  filename: z.string().optional(),
});

const updateProductValidationSchema = z.object({
  body: z.object({
    title: z.string().min(1).optional(),
    code: z.string().optional(),
    unit: z.string().optional(),
    description: z.string().optional(),
    category: z.string().min(1).optional(), // Assuming category is an ObjectId in string format
    subCategory: z.string().optional(),
    brand: z.string().min(1).optional(), // Assuming brand is an ObjectId in string format
    cartoncapacity: z.number().optional(),
    model: z.string().optional(),
    image: z.array(updateImageValidationSchema).optional(),
    price: z.number().optional(),
    tags: z.array(z.string()).optional(),
    status: z.enum(['active', 'inactive', 'deleted']).optional(),
  }),
});

export const productValidations = {
  createProductValidationSchema,
  updateProductValidationSchema,
};
