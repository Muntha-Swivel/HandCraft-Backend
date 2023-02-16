import express from "express";
import cors from "cors";
import deserializeUser from "../middleware/deserealizeUser";
import routes from "../routes";
import config from "config";

const createServer = () => {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  const corsOptions = {
    origin: config.get<string>("frontEndUrl"),
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
    preflightContinue: true,
  };
  app.use(cors(corsOptions));
  app.use(deserializeUser);
  routes(app);

  return app;
};

export default createServer;
