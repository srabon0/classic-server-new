import { Express, Request } from 'express';
import httpStatus from 'http-status';
import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import AppError from '../errors/AppError'; // Ensure AppError is correctly defined and imported

interface MulterRequest extends Request {
  uploadPath?: string;
  folderName?: string;
}

interface MulterFile extends Express.Multer.File {
  imageUrl?: string;
}

const storage = multer.diskStorage({
  destination: function (req: MulterRequest, file, cb) {
    if (req.uploadPath) {
      cb(null, req.uploadPath);
    } else {
      cb(new Error('Upload path is not defined'), '');
    }
  },
  filename: (req: MulterRequest, file: MulterFile, cb) => {
    const uniqueSuffix = Date.now() + '_' + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);

    if (req.folderName) {
      file.imageUrl = `images/${req.folderName}/${uniqueSuffix + extension}`;
    }
    cb(null, uniqueSuffix + extension);
  },
});

const uploader = multer({
  storage: storage,
  fileFilter: (
    req: MulterRequest,
    file: Express.Multer.File,
    cb: FileFilterCallback,
  ) => {
    const supportedImage = /png|jpg|jpeg|webp/;
    const extension = path.extname(file.originalname).toLowerCase();

    if (supportedImage.test(extension)) {
      cb(null, true);
    } else {
      cb(new AppError(httpStatus.BAD_REQUEST, 'Must be a png/jpg/webp image'));
    }
  },
  limits: {
    fileSize: 5000000, // 5 MB limit
  },
});

export default uploader;
