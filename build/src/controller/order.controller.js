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
exports.createOrderHandler = void 0;
const order_service_1 = require("../service/order.service");
const product_service_1 = require("../service/product.service");
const createOrderHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = res.locals.user._id;
    const body = req.body;
    const order = yield (0, order_service_1.createOrder)(Object.assign(Object.assign({}, body), { user: userId }));
    const { products } = body;
    //increase quantity
    for (const product of products) {
        const { product: productId, quantity } = product;
        yield (0, product_service_1.findAndUpdateProduct)({ _id: productId }, { $inc: { sold: quantity } }, { new: true });
    }
    return res.send(order);
});
exports.createOrderHandler = createOrderHandler;
