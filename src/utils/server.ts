import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const createServer = () => {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());

  app.use(
    cors({
      origin: ["https://handcraft.vercel.app/"],
      credentials: true,
    })
  );

  console.log("cors working");

  return app;
};

export default createServer;
