import express, { Router } from "express";
import routes from "./v1/index.js";
// import { addBrand, getBrands, updateBrand } from "../controllers/brands/brands.ctr.js";
// import { addCustomer, getCustomers, updateCustomer } from "../controllers/customers/customers.ctr.js";


const Route = (router) => {

  router.use(printRoutes);
  router.use(modifyHeaders);

  router.use('/', routes(Router()));

  return router;
}

/** @description prints route to the console */
function printRoutes(req, res, next ) {
  console.log(`\n========================= NEW REQUEST -> ${req.method} ${req.originalUrl}`);
  console.log(req.body);
  console.log(`\n=========================`);
  next();
}

/** @description modifies the headers for controllers */
function modifyHeaders(req, res, next ) {
  next();
};

export default Route;


// route.get("/new", (req, res) => {
//     // console.log(req.body);
//     res.status(200).json('hello world');
//     return
// });

// route.get('/', (req, res) => {
//     return res.status(200).json("Hello World");
// });

// route.get("/get-customers-data", getCustomers);
// route.post("/insert-customer-data", addCustomer);
// route.post("/update-customer-data", updateCustomer);

// route.get("/get-brands-data", getBrands);
// route.post("/insert-brand-data", addBrand);
// route.post("/update-brand-data", updateBrand);

// export default route;