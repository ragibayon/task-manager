import {Request, Response, NextFunction} from 'express';

const asyncWrapper = (fn: Function) => {
  // returns an async middleware function
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // the fn is async, it is resolved here
      await fn(req, res, next);
    } catch (err) {
      // sends error to the error middleware
      next(err);
    }
  };
};

export default asyncWrapper;

// I don't understand this shit!
