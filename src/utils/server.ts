import express from "express";
import cors from "cors";
//import router from "../routes";

const createServer = () => {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  //app.use("/employee", router);

  return app;
};

export default createServer;
