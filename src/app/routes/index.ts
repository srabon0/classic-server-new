import { Router } from 'express';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { BrandRoutes } from '../modules/brand/brand.route';
import { CategoryRoutes } from '../modules/category/category.route';
import { ProductRoutes } from '../modules/product/product.route';
import { FileRoutes } from '../modules/file/file.route';
import { UserRoutes } from '../modules/User/user.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/products',
    route: ProductRoutes,
  },
  {
    path: '/brands',
    route: BrandRoutes,
  },
  {
    path: '/categories',
    route: CategoryRoutes,
  },

  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/files',
    route: FileRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
