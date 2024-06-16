import httpStatus from 'http-status';
import { MulterError } from 'multer';
import { TGenericErrorResponse } from '../interface/error';

const handleMulterError = (err: MulterError): TGenericErrorResponse => {
  let response: TGenericErrorResponse;

  switch (err.code) {
    case 'LIMIT_FILE_SIZE':
      response = {
        errorSources: [],
        message: 'File size too large.',
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      };
      break;
    case 'LIMIT_FILE_COUNT':
      response = {
        errorSources: [],
        message: 'Unsupported file type.',
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      };
      break;
    default:
      response = {
        message: 'An error occurred while uploading the file.',
        statusCode: 500,
        errorSources: [
          {
            path: 'file',
            message: err.message,
          },
        ],
      };
  }

  return response;
};

export default handleMulterError;
