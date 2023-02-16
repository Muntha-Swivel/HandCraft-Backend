import supertest from "supertest";
import createServer from "../utils/server";
import mongoose from "mongoose";
import { createProduct } from "../service/product.service";
import { signJwt } from "../utils/jwt.utils";
import { MongoMemoryServer } from "mongodb-memory-server";

const app = createServer();

const user = new mongoose.Types.ObjectId().toString();

export const productPayload = {
  user: "63e090c219d16a48fe273aac",
  title: "Canon EOS 1500D DSLR Camera with 18-55mm Lens",
  description:
    "Designed for first-time DSLR owners who want impressive results straight out of the box, capture those magic moments no matter your level with the EOS 1500D. With easy to use automatic shooting modes, large 24.1 MP sensor, Canon Camera Connect app integration and built-in feature guide, EOS 1500D is always ready to go.",
  price: 879,
  image: "https://i.imgur.com/QlRphfQ.jpg",
};

export const userPayload = {
  _id: "63e090c219d16a48fe273aac",
  email: "admin@gmail.com",
  name: "Admin",
  isAdmin: true,
};

describe("product", () => {
  describe("get product route", () => {
    beforeAll(async () => {
      const mongoServer = await MongoMemoryServer.create();

      await mongoose.connect(mongoServer.getUri());
    });

    afterAll(async () => {
      await mongoose.disconnect();
      await mongoose.connection.close();
    });

    describe("given the product does exist", () => {
      it("should return a 200 status and the product", async () => {
        const product = await createProduct(productPayload);

        const { body, statusCode } = await supertest(app).get(
          `/api/product/${product._id}`
        );

        expect(statusCode).toBe(200);
      });
    });
  });

  describe("create product route", () => {
    describe("given the user is not logged in", () => {
      it("should return a 403", async () => {
        const { statusCode } = await supertest(app).post("/api/product");

        expect(statusCode).toBe(403);
      });
    });
  });
});
