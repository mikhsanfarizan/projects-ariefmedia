import express from "express";
import controller from "../controllers/product-controller.js";
import { addMeta } from "../middlewares/meta-middleware.js";
const router = express.Router();

router.get("/list", controller.productList);
router.get("/:slug", addMeta("Detail Produk"), controller.productDetail);

export default router;