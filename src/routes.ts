import { Express, Request, Response } from "express";
import { createUserSchema } from "./schema/user.schema";
import { createSessionSchema } from "./schema/session.schema";
import validateResource from "./middleware/validateResource";
import requireUser from "./middleware/requireUser";
import { createUserHandler } from "./controller/user.controller";
import {
  createUserSessionHandler,
  getUserSessionsHandler,
  deleteSessionHandler,
} from "./controller/session.controller";

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
}
export default routes;
