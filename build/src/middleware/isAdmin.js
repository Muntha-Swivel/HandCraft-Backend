"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isAdmin = (req, res, next) => {
    const isAdmin = res.locals.user.isAdmin;
    if (!isAdmin) {
        return res.sendStatus(403);
    }
    return next();
};
exports.default = isAdmin;
