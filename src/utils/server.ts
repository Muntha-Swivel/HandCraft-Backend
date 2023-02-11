import express from "express";
import cors from "cors";
//import router from "../routes";

const createServer = () => {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  // // app.use(cors());
  // // app.use(
  // //   cors({
  // //     origin: ["http://localhost:3000"],
  // //     credentials: true,
  // //   })
  // // );
  // app.use(function (req, res, next) {
  //   res.header('Access-Control-Allow-Origin', '*');
  //   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  //   res.header('Access-Control-Allow-Headers', 'Content-Type');
  //   next();
  // });

  const corsOptions = {
    origin: "https://handcraft-git-main-muntha-swivel.vercel.app",
    credentials: true,
  };

  app.use(cors(corsOptions));

  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Origin",
      "https://handcraft-git-main-muntha-swivel.vercel.app"
    );
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
  });

  return app;
};

export default createServer;
