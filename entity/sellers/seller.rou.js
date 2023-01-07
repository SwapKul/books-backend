import verifyToken from "../../config/admin.auth.config.js";
import { addSeller, getSellers, loginSeller, registerSeller, toggleSeller, updateSeller, updateCurrentSeller } from "./seller.ctr.js";

export const sellerRoutes = (router) => {
    router.post("/login", loginSeller);
    router.post("/register", registerSeller);
    router.get("/get-hello", (req, res) => {
        // console.log(req);
        return res.status(200).json("===get-hello worked")
    });
    router.get("/get-sellers-data", verifyToken, getSellers);
    router.post("/insert-seller-data", verifyToken, registerSeller);
    router.put("/update-seller-data", verifyToken, updateSeller);
    router.put("/update-current-seller-data", verifyToken, updateCurrentSeller);
    router.put("/toggle-seller-data", verifyToken, toggleSeller);
    return router;
}