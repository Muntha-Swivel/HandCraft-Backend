import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import ProductModel, {
  ProductDocument,
  ProductInput,
} from "../models/product.model";

const createProduct = async (input: Omit<ProductInput, "sold">) => {
  try {
    const result = await ProductModel.create(input);
    return result;
  } catch (e) {
    throw e;
  }
};

const findProduct = async (
  query: FilterQuery<ProductDocument>,
  options: QueryOptions = { lean: true }
) => {
  try {
    const result = await ProductModel.findOne(query, {}, options);
    return result;
  } catch (e) {
    throw e;
  }
};

const findAllProduct = async () => {
  try {
    const result = ProductModel.find();
    return result;
  } catch (err) {
    throw err;
  }
};

const findAndUpdateProduct = (
  query: FilterQuery<ProductDocument>,
  update: UpdateQuery<ProductDocument>,
  options: QueryOptions
) => {
  return ProductModel.findOneAndUpdate(query, update, options);
};

const deleteProduct = async (query: FilterQuery<ProductDocument>) => {
  return ProductModel.deleteOne(query);
};

export {
  createProduct,
  findProduct,
  findAndUpdateProduct,
  deleteProduct,
  findAllProduct,
};
