"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CustomError extends Error {
    constructor(message, errorCode) {
        super(message);
        this.errorCode = errorCode;
        this.name = 'CustomError';
    }
}
exports.default = CustomError;
