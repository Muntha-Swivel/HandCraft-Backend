import { Request, Response } from "express";
import {
  CreateProductInput,
  DeleteProductInput,
  UpdateProductInput,
  ReadProductInput,
} from "../schema/product.schema";
import {
  createProduct,
  deleteProduct,
  findAndUpdateProduct,
  findProduct,
  findAllProduct,
} from "../service/product.service";

const createProductHandler = async (
  req: Request<{}, {}, CreateProductInput["body"]>,
  res: Response
) => {
  const userId = res.locals.user._id;

  const body = req.body;

  const product = await createProduct({ ...body, user: userId });

  return res.send(product);
};

const getAllProductHandler = async (req: Request, res: Response) => {
  try {
    const products = await findAllProduct();
    res.send(products);
  } catch (err) {
    console.log(err);
    res.send(404);
  }
};

const updateProductHandler = async (
  req: Request<UpdateProductInput["params"]>,
  res: Response
) => {
  const userId = res.locals.user._id;

  const productId = req.params.productId;
  const update = req.body;

  try {
    const product = await findProduct({ _id: productId });

    if (!product) {
      return res.sendStatus(404);
    }
  } catch (err) {
    console.log(err);
    return res.sendStatus(404);
  }
  //   if (String(product.user) !== userId) {
  //     return res.sendStatus(403);
  //   }

  const updatedProduct = await findAndUpdateProduct(
    { _id: productId },
    update,
    {
      new: true,
    }
  );

  return res.send(updatedProduct);
};

const getProductHandler = async (
  req: Request<ReadProductInput["params"]>,
  res: Response
) => {
  const productId = req.params.productId;
  const product = await findProduct({ _id: productId });

  if (!product) {
    return res.sendStatus(404);
  }

  return res.send(product);
};

const deleteProductHandler = async (
  req: Request<DeleteProductInput["params"]>,
  res: Response
) => {
  const userId = res.locals.user._id;
  const productId = req.params.productId;

  try {
    const product = await findProduct({ _id: productId });

    if (!product) {
      return res.sendStatus(404);
    }
  } catch (err) {
    return res.sendStatus(404);
  }

  //   if (String(product.user) !== userId) {
  //     return res.sendStatus(403);
  //   }

  try {
    const result = await deleteProduct({ _id: productId });
    const products = await findAllProduct();
    res.send(products);
  } catch (err) {
    return res.sendStatus(500);
  }
};

export {
  createProductHandler,
  getAllProductHandler,
  getProductHandler,
  updateProductHandler,
  deleteProductHandler,
};
