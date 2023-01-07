import { Router } from "express";
import { sellerRoutes } from "../../entity/sellers/seller.rou.js";
import { productRoutes } from "../../entity/products/products.rou.js";
import { customerRoutes } from "../../entity/customers/customer.rou.js";
import { cartRoutes } from "../../entity/cart/cart.rou.js";
import { trialRoutes } from "../../entity/trialRoutes/try.rou.js";

const routes = (router) => {

  router.use("/trial", trialRoutes(Router()));
  router.use("/seller", sellerRoutes(Router()));
  router.use("/customer", customerRoutes(Router()));
  router.use("/cart", cartRoutes(Router()));
  router.use("/product", productRoutes(Router()));


  return router;
};

export default routes;
