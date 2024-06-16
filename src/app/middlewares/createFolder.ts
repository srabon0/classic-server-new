// createUploadsFolder.ts
import { NextFunction, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

interface RequestWithUploadPath extends Request {
  uploadPath?: string;
  folderName?: string;
}

const createUploadsFolder = (
  req: RequestWithUploadPath,
  res: Response,
  next: NextFunction,
): void => {
  const uniqueFolder = uuidv4();
  const dir = path.join(process.cwd(), 'images', uniqueFolder);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  req.uploadPath = dir;
  req.folderName = uniqueFolder;

  next();
};

export default createUploadsFolder;
