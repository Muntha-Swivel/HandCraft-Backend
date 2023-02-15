"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pino = require("pino");
const log = pino({
    transport: {
        target: "pino-pretty",
        options: {
            colorize: true,
        },
    },
    //timestamp: () => `,"time":"${dayjs().format()}"`,
});
exports.default = log;
