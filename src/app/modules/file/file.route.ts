import express from 'express';

import createUploadsFolder from '../../middlewares/createFolder';
import uploadInExistingFolder from '../../middlewares/uploadInExistingFolder';
import uploader from '../../middlewares/uploader';
import { UploadController } from './file.controller';

const router = express.Router();

router.post(
  '/upload-image',
  createUploadsFolder,
  uploader.array('image', 10),
  UploadController.uploadImage,
);

router.post(
  '/upload-to-folder/:folder',
  uploadInExistingFolder,
  uploader.array('image', 10),
  UploadController.uploadImageInSpecificFolder,
);


router.get('/:folder/:filename', UploadController.getImage);

export const FileRoutes = router;
