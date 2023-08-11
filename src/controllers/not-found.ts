import {Request, Response, NextFunction} from 'express';
import ResponseModel from '../models/response-model';
const notFound = (req: Request, res: Response, next: NextFunction) => {
  const notFoundResponse: ResponseModel<void> = {
    success: false,
    message: 'Content Not Found',
  };
  res.status(400).json(notFoundResponse);
};

export default notFound;
