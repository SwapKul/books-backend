import verifyToken from "../../config/admin.auth.config.js";
import { upload } from "../../index.js";
import {
  addProduct,
  getFeaturedProducts,
  getProducts,
  toggleProduct,
  toggleProductFeature,
  updateProduct,
} from "./product.ctr.js";

export const productRoutes = (router) => {
  router.get("/get-hello", (req, res) => {
    // console.log(req);
    return res.status(200).json("===get-hello worked");
  });
  router.get("/get-products-data", verifyToken, getProducts);
  router.get("/get-featured-products-data", verifyToken, getFeaturedProducts);
  router.post(
    "/insert-product-data",
    verifyToken,
    upload.single("file"),
    addProduct
  );
  router.put(
    "/update-product-data",
    verifyToken,
    upload.single("file"),
    updateProduct
  );
  router.put("/toggle-product-data", verifyToken, toggleProduct);
  router.put("/toggle-product-feature-data", verifyToken, toggleProductFeature);
  return router;
};
