"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const notFound = (req, res, next) => {
    const notFoundResponse = {
        success: false,
        message: 'Content Not Found',
    };
    res.status(400).json(notFoundResponse);
};
exports.default = notFound;
