import express from 'express';
// import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
// import { USER_ROLE } from '../user/user.constant';

import { BrandControllers } from './brand.controller';
import { brandValidations } from './brand.validation';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/create-brand',
  auth('admin'),
  validateRequest(brandValidations.createBrandValidationSchema),
  BrandControllers.createBrand,
);

router.get('/:id', BrandControllers.getSingleBrand);

router.put(
  '/:id',
  auth('admin'),
  validateRequest(brandValidations.updateBrandValidationSchema),
  BrandControllers.updateBrand,
);

router.delete('/:id', auth('admin'), BrandControllers.deleteBrand);

router.get(
  '/',
  // auth(USER_ROLE.admin, USER_ROLE.officeAdmin),
  BrandControllers.getAllBrands,
);

export const BrandRoutes = router;
