import { object, number, string, TypeOf, array } from "zod";

const payload = {
  body: object({
    products: array(
      object({
        product: string(),
        quantity: number(),
      })
    ),
    total: number(),
  }),
};

export const createOrderSehema = object({
  ...payload,
});

export type CreateOrderInput = TypeOf<typeof createOrderSehema>;
