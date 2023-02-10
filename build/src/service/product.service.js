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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllProduct = exports.deleteProduct = exports.findAndUpdateProduct = exports.findProduct = exports.createProduct = void 0;
const product_model_1 = __importDefault(require("../models/product.model"));
const createProduct = (input) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield product_model_1.default.create(input);
        return result;
    }
    catch (e) {
        throw e;
    }
});
exports.createProduct = createProduct;
const findProduct = (query, options = { lean: true }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield product_model_1.default.findOne(query, {}, options);
        return result;
    }
    catch (e) {
        throw e;
    }
});
exports.findProduct = findProduct;
const findAllProduct = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = product_model_1.default.find();
        return result;
    }
    catch (err) {
        throw err;
    }
});
exports.findAllProduct = findAllProduct;
const findAndUpdateProduct = (query, update, options) => {
    return product_model_1.default.findOneAndUpdate(query, update, options);
};
exports.findAndUpdateProduct = findAndUpdateProduct;
const deleteProduct = (query) => __awaiter(void 0, void 0, void 0, function* () {
    return product_model_1.default.deleteOne(query);
});
exports.deleteProduct = deleteProduct;
