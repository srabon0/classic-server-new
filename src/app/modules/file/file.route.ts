import express from 'express';

import createUploadsFolder from '../../middlewares/createFolder';
import uploader from '../../middlewares/uploader';
import { UploadController } from './file.controller';

const router = express.Router();

router.post(
  '/upload-image',
  createUploadsFolder,
  uploader.array('image', 10),
  UploadController.uploadImage,
);

router.get('/:folder/:filename', UploadController.getImage);

export const FileRoutes = router;
