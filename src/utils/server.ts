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
      credentials: true,
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
      allowedHeaders: ["Content-Type", "Authorization"],
      origin: [
        "http://localhost:3000",
        "https://handcraft-git-main-muntha-swivel.vercel.app",
        "https://main.d3gukprab816t5.amplifyapp.com",
      ],
    })
  );

  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });
  return app;
};

export default createServer;
