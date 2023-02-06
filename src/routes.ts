import { Express, Request, Response } from "express";
import { createUserSchema } from "./schema/user.schema";
import { createSessionSchema } from "./schema/session.schema";
import {
  createProductSchema,
  updateProductSchema,
  deleteProductSchema,
} from "./schema/product.schema";
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
  createProductHandler,
  updateProductHandler,
  deleteProductHandler,
} from "./controller/product.controller";

function routes(app: Express) {
  app.get("/", (req: Request, res: Response) => {
    res.send("hello world").status(200);
  });
  app.post("/api/users", validateResource(createUserSchema), createUserHandler);
  app.post(
    "/api/sessions",
    validateResource(createSessionSchema),
    createUserSessionHandler
  );
  app.get("/api/sessions", requireUser, getUserSessionsHandler);
  app.delete("/api/sessions", requireUser, deleteSessionHandler);

  //product routes
  app.post(
    "/api/product",
    [requireUser, isAdmin, validateResource(createProductSchema)],
    createProductHandler
  );
  app.put(
    "/api/product/:productId",
    [requireUser, validateResource(updateProductSchema)],
    updateProductHandler
  );
  app.delete(
    "/api/product/:productId",
    [requireUser, validateResource(deleteProductSchema)],
    deleteProductHandler
  );
}
export default routes;
