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
Object.defineProperty(exports, "__esModule", { value: true });
const asyncWrapper = (fn) => {
    // returns an async middleware function
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // the fn is async, it is resolved here
            yield fn(req, res, next);
        }
        catch (err) {
            // sends error to the error middleware
            next(err);
        }
    });
};
exports.default = asyncWrapper;
// I don't understand this shit!
