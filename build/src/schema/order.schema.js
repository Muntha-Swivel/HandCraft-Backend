"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrderSehema = void 0;
const zod_1 = require("zod");
const payload = {
    body: (0, zod_1.object)({
        products: (0, zod_1.array)((0, zod_1.object)({
            product: (0, zod_1.string)(),
            quantity: (0, zod_1.number)(),
        })),
        total: (0, zod_1.number)(),
    }),
};
exports.createOrderSehema = (0, zod_1.object)(Object.assign({}, payload));
