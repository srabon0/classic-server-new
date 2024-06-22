// uploadInExistingFolder.ts
import { NextFunction, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
interface RequestWithUploadPath extends Request {
  uploadPath?: string;
  folderName?: string;
}

const uploadInExistingFolder = (
  req: RequestWithUploadPath,
  res: Response,
  next: NextFunction,
): void => {
  // Use folderName from req.params or generate a unique one if not provided
  let folderName;
  const { folder } = req.params;
  if (folder === 'tempFolder') {
    folderName = uuidv4();
  } else {
    folderName = folder;
  }
  const dir = path.join(process.cwd(), 'images', folderName);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  req.uploadPath = dir;
  req.folderName = folderName;

  next();
};

export default uploadInExistingFolder;
