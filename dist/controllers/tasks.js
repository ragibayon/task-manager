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
const async_1 = __importDefault(require("../middleware/async"));
exports.getAllTasks = (0, async_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const tasks = yield tasks_1.default.find();
    const taskResponse = {
        success: true,
        message: 'All tasks are successfully fetched',
        data: tasks,
    };
    res.status(200).json(taskResponse);
}));
exports.createTask = (0, async_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const newTask = new tasks_1.default({
        title: req.body.title,
    });
    yield newTask.save();
    const taskResponse = {
        success: true,
        message: 'Task created successfully',
    };
    res.status(201).json(taskResponse);
}));
exports.getTask = (0, async_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const tid = req.params.id;
    const task = yield tasks_1.default.findById(tid);
    if (!task) {
        throw new CustomError_1.default(`Could not find task with id: ${tid}`, 404);
    }
    const taskResponse = {
        success: true,
        message: 'Task fetched successfully',
        data: task,
    };
    res.status(200).json(taskResponse);
}));
exports.updateTask = (0, async_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const tid = req.params.id;
    const updatedData = req.body;
    const updatedTask = yield tasks_1.default.findByIdAndUpdate({ _id: tid }, updatedData, {
        new: true,
        runValidators: true,
    });
    if (!updatedTask) {
        throw new CustomError_1.default(`Could not find task with id: ${tid}`, 404);
    }
    const taskResponse = {
        success: true,
        message: 'Task updated successfully',
        data: updatedTask,
    };
    res.status(200).json(taskResponse);
}));
exports.deleteTask = (0, async_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const tid = req.params.id;
    const result = yield tasks_1.default.findByIdAndDelete(tid);
    if (!result) {
        throw new CustomError_1.default(`Could not find task with id: ${tid}`, 404);
    }
    const taskResponse = {
        success: true,
        message: 'task deleted successfully',
    };
    res.status(200).json(taskResponse);
}));
