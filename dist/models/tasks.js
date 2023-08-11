"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const tasksSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, 'Must provide task title'],
        trim: true,
        minlength: [3, 'Too few characters'],
    },
    isCompleted: {
        type: Boolean,
        required: true,
        default: false,
    },
});
const Task = (0, mongoose_1.model)('Task', tasksSchema);
exports.default = Task;
