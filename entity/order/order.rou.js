
import verifyToken from "../../config/admin.auth.config.js";
import { addToCart } from "./cart.ctr.js";
import { cancelOrder, createOrder, getOrders } from "./order.ctr.js";

export const orderRoutes = (router) => {
    // router.get("/get-hello", (req, res) => {
    //     // console.log(req);
    //     return res.status(200).json("===get-hello worked")
    // });
    // router.get("/get-brands-overall-data", verifyToken, getBrandsOverAll);
    // router.get("/get-brands-data", verifyToken, getBrands);
    router.post("/get-orders", getOrders);
    router.post("/create-an-order", createOrder);
    router.post("/cancel-order", cancelOrder);
    // router.put("/update-brand-data", verifyToken, updateBrand);
    // router.put("/toggle-brand-data", verifyToken, toggleBrand);
    return router;
}