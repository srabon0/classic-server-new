import express from 'express';
// import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
// import { USER_ROLE } from '../user/user.constant';
import { CategoryControllers } from './category.controller';
import { categoryValidations } from './category.validation';

const router = express.Router();

router.get('/:id', CategoryControllers.getSingleCategory);
router.post(
  '/create-category',
  validateRequest(categoryValidations.createCategoryValidationSchema),
  CategoryControllers.createCategory,
);

router.put(
  '/:id',
  validateRequest(categoryValidations.updateCategoryValidationSchema),
  CategoryControllers.updateCategory,
);

router.delete('/:id', CategoryControllers.deleteCategory);

router.get(
  '/',
  // auth(USER_ROLE.admin, USER_ROLE.officeAdmin),
  CategoryControllers.getAllCategorys,
);

export const CategoryRoutes = router;
