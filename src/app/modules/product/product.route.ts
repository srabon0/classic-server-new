import express from 'express';
import validateRequest from '../../middlewares/validateRequest';

import { ProductControllers } from './product.controller';
import { productValidations } from './product.validation';

const router = express.Router();

router.get('/', ProductControllers.getAllProducts);
// router.post('/', validateRequest(productValidations.createProductValidationSchema), ProductControllers.createProduct);

router.get('/:id', ProductControllers.getSingleProduct);

router.post('/search', ProductControllers.searchProduct);

router.patch(
  '/:id',
  validateRequest(productValidations.updateProductValidationSchema),
  ProductControllers.updateProduct,
);

router.delete('/:id', ProductControllers.deleteProduct);

router.post(
  '/create-product',
  validateRequest(productValidations.createProductValidationSchema),
  ProductControllers.createProduct,
);

router.post('/delete-image/:productId', ProductControllers.deleteImage);
router.post('/latest', ProductControllers.getLatestProducts);
router.post('/slider', ProductControllers.getSliderProducts);

export const ProductRoutes = router;
