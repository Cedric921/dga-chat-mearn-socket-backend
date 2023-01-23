"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundError = exports.internalError = void 0;
const internalError = (err, req, res, next) => {
    var _a;
    const errorCode = (_a = req.statusCode) !== null && _a !== void 0 ? _a : 500;
    const stack = process.env.ENV === 'production' ? err.message : err.stack;
    res.status(errorCode).json({ message: err.message, stack });
    // next()
};
exports.internalError = internalError;
const notFoundError = (req, res, next) => {
    res.status(404).json({ error: 'data not found' });
};
exports.notFoundError = notFoundError;
const errors = { internalError: exports.internalError, notFoundError: exports.notFoundError };
exports.default = errors;
