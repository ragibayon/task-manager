import {Request, Response, NextFunction} from 'express';
import Task from '../models/tasks';
import {TaskResponse, ErrorResponse} from '../models/task-response-model';
import CustomError from '../utils/CustomError';

export const getAllTasks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tasks = await Task.find();
    const taskResponse: TaskResponse<typeof tasks> = {
      success: true,
      message: 'All tasks are successfully fetched',
      data: tasks,
    };
    res.status(200).json(taskResponse);
  } catch (err) {
    const errorResponse: ErrorResponse = {
      error: {code: 500, message: (err as Error).message},
    };
    res.status(500).json(errorResponse);
  }
};

export const createTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const title = req.body.title;

    const newTask = new Task({
      title,
    });
    await newTask.save();
    const taskResponse: TaskResponse<typeof newTask> = {
      success: true,
      message: 'Task created successfully',
    };
    res.status(201).json(taskResponse);
  } catch (err) {
    console.log(err);
    const errorResponse: ErrorResponse = {
      error: {code: 500, message: (err as Error).message},
    };
    res.status(500).json(errorResponse);
  }
};

export const getTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tid = req.params.id;
    const task = await Task.findById(tid);

    if (!task) {
      throw new CustomError('Could not find task', 404);
    }

    const taskResponse: TaskResponse<typeof task> = {
      success: true,
      message: 'Task fetched successfully',
      data: task,
    };
    res.status(200).json(taskResponse);
  } catch (err) {
    if (err instanceof CustomError) {
      const errorResponse: ErrorResponse = {
        error: {code: 404, message: (err as Error).message},
      };
      return res.status(errorResponse.error.code).json(errorResponse);
    }

    const errorResponse: ErrorResponse = {
      error: {code: 500, message: (err as Error).message},
    };
    res.status(500).json(errorResponse);
  }
};

export const updateTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tid = req.params.id;
    const updatedData = req.body;

    const updatedTask = await Task.findByIdAndUpdate({_id: tid}, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!updatedTask) {
      throw new CustomError('Could not find task', 404);
    }
    const taskResponse: TaskResponse<object> = {
      success: true,
      message: 'Task updated successfully',
      data: updatedTask!,
    };

    res.status(200).json(taskResponse);
  } catch (err) {
    if (err instanceof CustomError) {
      const errorResponse: ErrorResponse = {
        error: {code: 404, message: (err as Error).message},
      };
      return res.status(errorResponse.error.code).json(errorResponse);
    }
    const errorResponse: ErrorResponse = {
      error: {code: 500, message: (err as Error).message},
    };
    res.status(500).json(errorResponse);
  }
};

export const deleteTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tid = req.params.id;
    const result = await Task.findByIdAndDelete(tid);

    if (!result) {
      throw new CustomError('Could not find task', 404);
    }

    const taskResponse: TaskResponse<void> = {
      success: true,
      message: 'task deleted successfully',
    };
    res.status(200).json(taskResponse);
  } catch (err) {
    if (err instanceof CustomError) {
      const errorResponse: ErrorResponse = {
        error: {code: 404, message: (err as Error).message},
      };
      return res.status(errorResponse.error.code).json(errorResponse);
    }
    const errorResponse: ErrorResponse = {
      error: {code: 500, message: (err as Error).message},
    };
    res.status(500).json(errorResponse);
  }
};
