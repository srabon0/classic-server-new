import { z } from 'zod';

const CreateUserValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required.',
      invalid_type_error: 'Name must be a string.',
    }),
    email: z
      .string({
        required_error: 'Email is required.',
        invalid_type_error: 'Email must be a string.',
      })
      .email('Invalid email format.'),
    password: z
      .string({
        required_error: 'Password is required.',
        invalid_type_error: 'Password must be a string.',
      })
      .min(8, { message: 'Password must be at least 8 characters long.' }),
    phone: z.string({
      required_error: 'Phone is required.',
      invalid_type_error: 'Phone must be a string.',
    }),
    address: z.string({
      required_error: 'Address is required.',
      invalid_type_error: 'Address must be a string.',
    }),
    role: z.enum(['admin', 'user'], {
      required_error: 'Role is required.',
      invalid_type_error: 'Role must be either "admin" or "user".',
    }),
  }),
});

const UpdateUserValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'Name is required.',
        invalid_type_error: 'Name must be a string.',
      })
      .optional(),
    email: z
      .string({
        required_error: 'Email is required.',
        invalid_type_error: 'Email must be a string.',
      })
      .email('Invalid email format.')
      .optional(),
    phone: z
      .string({
        required_error: 'Phone is required.',
        invalid_type_error: 'Phone must be a string.',
      })
      .optional(),
    address: z
      .string({
        required_error: 'Address is required.',
        invalid_type_error: 'Address must be a string.',
      })
      .optional(),
    role: z
      .enum(['admin', 'user'], {
        required_error: 'Role is required.',
        invalid_type_error: 'Role must be either "admin" or "user".',
      })
      .optional(),
  }),
});

export const userValidation = {
  CreateUserValidationSchema,
  UpdateUserValidationSchema,
};
