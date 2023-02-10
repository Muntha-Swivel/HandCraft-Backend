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
exports.deleteProductHandler = exports.updateProductHandler = exports.getProductHandler = exports.getAllProductHandler = exports.createProductHandler = void 0;
const product_service_1 = require("../service/product.service");
const createProductHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = res.locals.user._id;
    const body = req.body;
    const product = yield (0, product_service_1.createProduct)(Object.assign(Object.assign({}, body), { user: userId }));
    return res.send(product);
});
exports.createProductHandler = createProductHandler;
const getAllProductHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield (0, product_service_1.findAllProduct)();
        res.send(products);
    }
    catch (err) {
        console.log(err);
        res.send(404);
    }
});
exports.getAllProductHandler = getAllProductHandler;
const updateProductHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = res.locals.user._id;
    const productId = req.params.productId;
    const update = req.body;
    try {
        const product = yield (0, product_service_1.findProduct)({ _id: productId });
        if (!product) {
            return res.sendStatus(404);
        }
    }
    catch (err) {
        console.log(err);
        return res.sendStatus(404);
    }
    //   if (String(product.user) !== userId) {
    //     return res.sendStatus(403);
    //   }
    const updatedProduct = yield (0, product_service_1.findAndUpdateProduct)({ _id: productId }, update, {
        new: true,
    });
    return res.send(updatedProduct);
});
exports.updateProductHandler = updateProductHandler;
const getProductHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.params.productId;
    const product = yield (0, product_service_1.findProduct)({ _id: productId });
    if (!product) {
        return res.sendStatus(404);
    }
    return res.send(product);
});
exports.getProductHandler = getProductHandler;
const deleteProductHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = res.locals.user._id;
    const productId = req.params.productId;
    try {
        const product = yield (0, product_service_1.findProduct)({ _id: productId });
        if (!product) {
            return res.sendStatus(404);
        }
    }
    catch (err) {
        return res.sendStatus(404);
    }
    //   if (String(product.user) !== userId) {
    //     return res.sendStatus(403);
    //   }
    try {
        const result = yield (0, product_service_1.deleteProduct)({ _id: productId });
        const products = yield (0, product_service_1.findAllProduct)();
        res.send(products);
    }
    catch (err) {
        return res.sendStatus(500);
    }
});
exports.deleteProductHandler = deleteProductHandler;
