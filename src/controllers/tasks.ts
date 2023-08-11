import {Request, Response, NextFunction} from 'express';
import Task from '../models/tasks';
import {ResponseModel} from '../models/response-model';
import CustomError from '../utils/CustomError';
import asyncWrapper from '../middleware/async';

export const getAllTasks = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const tasks = await Task.find();
    const taskResponse: ResponseModel<typeof tasks> = {
      success: true,
      message: 'All tasks are successfully fetched',
      data: tasks,
    };
    res.status(200).json(taskResponse);
  }
);

export const createTask = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const newTask = new Task({
      title: req.body.title,
    });
    await newTask.save();
    const taskResponse: ResponseModel<typeof newTask> = {
      success: true,
      message: 'Task created successfully',
    };
    res.status(201).json(taskResponse);
  }
);

export const getTask = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const tid = req.params.id;
    const task = await Task.findById(tid);

    if (!task) {
      throw new CustomError(`Could not find task with id: ${tid}`, 404);
    }

    const taskResponse: ResponseModel<typeof task> = {
      success: true,
      message: 'Task fetched successfully',
      data: task,
    };
    res.status(200).json(taskResponse);
  }
);

export const updateTask = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const tid = req.params.id;
    const updatedData = req.body;

    const updatedTask = await Task.findByIdAndUpdate({_id: tid}, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!updatedTask) {
      throw new CustomError(`Could not find task with id: ${tid}`, 404);
    }

    const taskResponse: ResponseModel<object> = {
      success: true,
      message: 'Task updated successfully',
      data: updatedTask!,
    };
    res.status(200).json(taskResponse);
  }
);

export const deleteTask = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const tid = req.params.id;
    const result = await Task.findByIdAndDelete(tid);

    if (!result) {
      throw new CustomError(`Could not find task with id: ${tid}`, 404);
    }

    const taskResponse: ResponseModel<void> = {
      success: true,
      message: 'task deleted successfully',
    };
    res.status(200).json(taskResponse);
  }
);
