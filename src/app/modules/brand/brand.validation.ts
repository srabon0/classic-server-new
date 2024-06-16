import { z } from 'zod';

const createBrandValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    description: z.string().optional(),
  }),
});

const updateBrandValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
  }),
});

export const brandValidations = {
  createBrandValidationSchema,
  updateBrandValidationSchema,
};
