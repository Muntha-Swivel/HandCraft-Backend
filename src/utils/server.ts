import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const createServer = () => {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());

  const corsOptions = {
    origin: "https://handcraft.vercel.app/",
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  };

  app.use(cors(corsOptions));
  console.log("cors working");

  return app;
};

export default createServer;
