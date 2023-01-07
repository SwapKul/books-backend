import verifyToken from "../../config/admin.auth.config.js";
import { upload } from "../../index.js";
import {
  addCustomer,
  getCustomers,
  loginCustomer,
  registerCustomer,
  toggleCustomer,
  updateCustomer,
  updateCustomerImage,
} from "./customer.ctr.js";

export const customerRoutes = (router) => {
  router.post("/login", loginCustomer);
  router.post("/register", registerCustomer);
  router.get("/get-hello", (req, res) => {
    // console.log(req);
    return res.status(200).json("===get-hello worked");
  });
  router.get("/get-customers-data", verifyToken, getCustomers);
  router.post("/insert-customer-data", verifyToken, addCustomer);
  router.put(
    "/update-customer-data",
    verifyToken,
    upload.single("file"),
    updateCustomer
  );
  router.put(
    "/update-customer-image",
    verifyToken,
    upload.single("file"),
    updateCustomerImage
  );
  router.put("/toggle-customer-data", verifyToken, toggleCustomer);
  return router;
};
