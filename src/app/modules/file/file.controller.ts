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

export const UploadController = {
  uploadImage,
  getImage,
};
