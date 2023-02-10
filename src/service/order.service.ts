import OrderModel, { OrderInput } from "../models/order.model";
const createOrder = async (input: OrderInput) => {
  try {
    const result = await OrderModel.create(input);
    return result;
  } catch (e) {
    throw e;
  }
};

export { createOrder };
