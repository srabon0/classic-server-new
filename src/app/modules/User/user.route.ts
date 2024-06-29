import express from 'express';

import { UserController } from './user.controller';

import auth from '../../middlewares/auth';

const router = express.Router();

router.get('/me', auth('admin', 'user'), UserController.getMe);
router.put('/me', auth('admin', 'user'), UserController.updateMe);

export const UserRoutes = router;
