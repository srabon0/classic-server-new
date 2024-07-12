import express from 'express';
// import auth from '../../middlewares/auth';
// import { USER_ROLE } from '../user/user.constant';

import { DashboardControllers } from './dashboard.controller';

const router = express.Router();

router.get('/get-all-counts', DashboardControllers.getDashboardCounts);

export const DashboardRoutes = router;
