import { Express, Request, Response } from "express";
import { createUserSchema } from "./schema/user.schema";
import { createSessionSchema } from "./schema/session.schema";
import {
  createProductSchema,
  updateProductSchema,
  deleteProductSchema,
} from "./schema/product.schema";
import { createOrderSehema } from "./schema/order.schema";
import validateResource from "./middleware/validateResource";
import requireUser from "./middleware/requireUser";
import isAdmin from "./middleware/isAdmin";
import { createUserHandler } from "./controller/user.controller";
import {
  createUserSessionHandler,
  getUserSessionsHandler,
  deleteSessionHandler,
} from "./controller/session.controller";
import {
  getAllProductHandler,
  getProductHandler,
  createProductHandler,
  updateProductHandler,
  deleteProductHandler,
} from "./controller/product.controller";
import { createOrderHandler } from "./controller/order.controller";

function routes(app: Express) {
  app.get("/", (req: Request, res: Response) => {
    res.send("hello world Dude!").status(200);
  });

  //user
  app.post("/api/users", validateResource(createUserSchema), createUserHandler);

  //sessions
  app.post(
    "/api/sessions",
    validateResource(createSessionSchema),
    createUserSessionHandler
  );
  app.get("/api/sessions", requireUser, getUserSessionsHandler);
  app.delete("/api/sessions", requireUser, deleteSessionHandler);

  //product routes
  app.get("/api/product", getAllProductHandler);
  app.get("/api/product/:productId", getProductHandler);
  app.post(
    "/api/product",
    [requireUser, isAdmin, validateResource(createProductSchema)],
    createProductHandler
  );
  app.put(
    "/api/product/:productId",
    [requireUser, isAdmin, validateResource(updateProductSchema)],
    updateProductHandler
  );
  app.delete(
    "/api/product/:productId",
    [requireUser, isAdmin, validateResource(deleteProductSchema)],
    deleteProductHandler
  );

  //order routes
  app.post(
    "/api/order",
    [requireUser, validateResource(createOrderSehema)],
    createOrderHandler
  );
}
export default routes;
