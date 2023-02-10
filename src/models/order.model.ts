import mongoose from "mongoose";
import { UserDocument } from "./user.model";
import Product, { ProductDocument } from "./product.model";

export interface OrderInput {
  user: UserDocument["_id"];
  products: Array<{ product: ProductDocument["_id"]; quantity: number }>;
  total: number;
}

export interface OrderDocument extends OrderInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    products: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, required: true },
      },
    ],
    total: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const OrderModel = mongoose.model<OrderDocument>("Order", orderSchema);

export default OrderModel;
