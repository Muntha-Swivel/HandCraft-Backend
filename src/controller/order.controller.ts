import { Request, Response } from "express";
import { CreateOrderInput } from "../schema/order.schema";
import { createOrder } from "../service/order.service";
import { findAndUpdateProduct } from "../service/product.service";
const createOrderHandler = async (
  req: Request<{}, {}, CreateOrderInput["body"]>,
  res: Response
) => {
  const userId = res.locals.user._id;

  const body = req.body;

  const order = await createOrder({ ...body, user: userId });

  const { products } = body;

  //increase quantity
  for (const product of products) {
    const { product: productId, quantity } = product;
    await findAndUpdateProduct(
      { _id: productId },
      { $inc: { sold: quantity } },
      { new: true }
    );
  }

  return res.send(order);
};

export { createOrderHandler };
