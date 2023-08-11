"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.getTask = exports.createTask = exports.getAllTasks = void 0;
const tasks_1 = __importDefault(require("../models/tasks"));
const CustomError_1 = __importDefault(require("../utils/CustomError"));
const getAllTasks = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield tasks_1.default.find();
        const taskResponse = {
            success: true,
            message: 'All tasks are successfully fetched',
            data: tasks,
        };
        res.status(200).json(taskResponse);
    }
    catch (err) {
        const errorResponse = {
            error: { code: 500, message: err.message },
        };
        res.status(500).json(errorResponse);
    }
});
exports.getAllTasks = getAllTasks;
const createTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const title = req.body.title;
        const newTask = new tasks_1.default({
            title,
        });
        yield newTask.save();
        const taskResponse = {
            success: true,
            message: 'Task created successfully',
        };
        res.status(201).json(taskResponse);
    }
    catch (err) {
        console.log(err);
        const errorResponse = {
            error: { code: 500, message: err.message },
        };
        res.status(500).json(errorResponse);
    }
});
exports.createTask = createTask;
const getTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tid = req.params.id;
        const task = yield tasks_1.default.findById(tid);
        if (!task) {
            throw new CustomError_1.default('Could not find task', 404);
        }
        const taskResponse = {
            success: true,
            message: 'Task fetched successfully',
            data: task,
        };
        res.status(200).json(taskResponse);
    }
    catch (err) {
        if (err instanceof CustomError_1.default) {
            const errorResponse = {
                error: { code: 404, message: err.message },
            };
            return res.status(errorResponse.error.code).json(errorResponse);
        }
        const errorResponse = {
            error: { code: 500, message: err.message },
        };
        res.status(500).json(errorResponse);
    }
});
exports.getTask = getTask;
const updateTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tid = req.params.id;
        const updatedData = req.body;
        const updatedTask = yield tasks_1.default.findByIdAndUpdate({ _id: tid }, updatedData, {
            new: true,
            runValidators: true,
        });
        if (!updatedTask) {
            throw new CustomError_1.default('Could not find task', 404);
        }
        const taskResponse = {
            success: true,
            message: 'Task updated successfully',
            data: updatedTask,
        };
        res.status(200).json(taskResponse);
    }
    catch (err) {
        if (err instanceof CustomError_1.default) {
            const errorResponse = {
                error: { code: 404, message: err.message },
            };
            return res.status(errorResponse.error.code).json(errorResponse);
        }
        const errorResponse = {
            error: { code: 500, message: err.message },
        };
        res.status(500).json(errorResponse);
    }
});
exports.updateTask = updateTask;
const deleteTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tid = req.params.id;
        const result = yield tasks_1.default.findByIdAndDelete(tid);
        if (!result) {
            throw new CustomError_1.default('Could not find task', 404);
        }
        const taskResponse = {
            success: true,
            message: 'task deleted successfully',
        };
        res.status(200).json(taskResponse);
    }
    catch (err) {
        if (err instanceof CustomError_1.default) {
            const errorResponse = {
                error: { code: 404, message: err.message },
            };
            return res.status(errorResponse.error.code).json(errorResponse);
        }
        const errorResponse = {
            error: { code: 500, message: err.message },
        };
        res.status(500).json(errorResponse);
    }
});
exports.deleteTask = deleteTask;
