import express from "express";
import cors from "cors";
//import router from "../routes";

const createServer = () => {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  // app.use(cors());
  app.use(
    cors({
      origin: [
        "https://handcraft-git-main-muntha-swivel.vercel.app/",
        "http://localhost:3000",
      ],
      credentials: true,
    })
  );

  return app;
};

export default createServer;
