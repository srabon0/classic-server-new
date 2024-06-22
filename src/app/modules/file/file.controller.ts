/* eslint-disable no-undef */
import { Express, Request, Response } from 'express';
import fs from 'fs';
import httpStatus from 'http-status';
import path from 'path';
import sendResponse from '../../utils/sendResponse';

interface RequestWithFolderName extends Request {
  folderName?: string;
}

interface ExtendedFile extends Express.Multer.File {
  folder?: string;
}

const uploadImage = async (req: RequestWithFolderName, res: Response) => {
  const withFolderName = req.folderName as string;
  const files = req.files;
  (files as ExtendedFile[]).forEach((file: ExtendedFile) => {
    file.folder = withFolderName;
  });

  try {
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'File is uploaded',
      data: files,
    });
  } catch (error) {
    sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: true,
      message: 'File is not uploaded',
      data: null,
    });
  }
};

const uploadImageInSpecificFolder = async (
  req: RequestWithFolderName,
  res: Response,
) => {
  const withFolderName = req.folderName as string;
  const files = req.files;
  (files as ExtendedFile[]).forEach((file: ExtendedFile) => {
    file.folder = withFolderName;
  });

  try {
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'File is uploaded',
      data: files,
    });
  } catch (error) {
    sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: true,
      message: 'File is not uploaded',
      data: null,
    });
  }
};

const getImage = async (req: RequestWithFolderName, res: Response) => {
  const { folder, filename } = req.params;
  const filePath = path.join(
    __dirname,
    `../../../../images/${folder}/${filename}`,
  );
  if (!fs.existsSync(filePath)) {
    return sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'File not found',
      data: null,
    });
  }
  res.sendFile(filePath);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const deleteImage = (image: any) => {
  const { folder, filename } = image;
  const filePath = path.join(
    __dirname,
    `../../../../images/${folder}/${filename}`,
  );
  if (!fs.existsSync(filePath)) {
    return false;
  }

  fs.unlinkSync(filePath);
  return true;
};

const deleteFolder = (folder: string) => {
  const folderPath = path.join(__dirname, `../../../../images/${folder}`);
  if (!fs.existsSync(folderPath)) {
    return false;
  }

  fs.rmdirSync(folderPath, { recursive: true });
  return true;
};

export const UploadController = {
  uploadImage,
  getImage,
  uploadImageInSpecificFolder,
  deleteImage,
  deleteFolder,
};
