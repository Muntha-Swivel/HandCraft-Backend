"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const createServer = () => {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use((0, cookie_parser_1.default)());
    const corsOptions = {
        origin: "https://handcraft.vercel.app",
        credentials: true,
        optionSuccessStatus: 200,
    };
    app.use((0, cors_1.default)(corsOptions));
    console.log("cors working");
    return app;
};
exports.default = createServer;
