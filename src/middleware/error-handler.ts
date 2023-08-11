import {NextFunction, Request, Response} from 'express';
import CustomError from '../utils/CustomError';
import {ErrorResponseModel} from '../models/response-model';

const errorHandlerMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    const errorResponse: ErrorResponseModel = {
      error: {code: err.statusCode, message: err.message},
    };
    return res.status(errorResponse.error.code).json(errorResponse);
  }

  const errorResponse: ErrorResponseModel = {
    error: {code: 500, message: err.message},
  };
  res.status(500).json(errorResponse);
};

export default errorHandlerMiddleware;
