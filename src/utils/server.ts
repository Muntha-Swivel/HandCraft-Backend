import express from "express";
import cors from "cors";
//import router from "../routes";

const createServer = () => {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  const corsOptions = {
    origin: "https://handcraft.vercel.app",
    optionSuccessStatus: 200,
    preflightContinue: true,
  };
  app.use(cors(corsOptions));

  return app;
};

export default createServer;
