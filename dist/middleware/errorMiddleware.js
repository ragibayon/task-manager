"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CustomError_1 = __importDefault(require("../utils/CustomError"));
const errorMiddleware = (err, req, res, next) => {
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
};
exports.default = errorMiddleware;
