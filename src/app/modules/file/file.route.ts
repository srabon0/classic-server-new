import express from 'express';

import auth from '../../middlewares/auth';
import createUploadsFolder from '../../middlewares/createFolder';
import uploadInExistingFolder from '../../middlewares/uploadInExistingFolder';
import uploader from '../../middlewares/uploader';
import { UploadController } from './file.controller';

const router = express.Router();

router.post(
  '/upload-image',
  auth('admin'),
  createUploadsFolder,
  uploader.array('image', 10),
  UploadController.uploadImage,
);

router.post(
  '/upload-to-folder/:folder',
  auth('admin'),
  uploadInExistingFolder,
  uploader.array('image', 10),
  UploadController.uploadImageInSpecificFolder,
);

router.get('/:folder/:filename', UploadController.getImage);

export const FileRoutes = router;
