import "dotenv/config";
import express from "express";
import { addMeta } from "../middlewares/meta-middleware.js";
const router = express.Router();

router.get("/", addMeta("Home"), async (req, res) => {
  try {
    res.render("home", {
      meta: res.locals.meta
    });
  } catch (error) {
    console.error(error?.message);
    res.render("error", {
      error_code: 500,
      error_message: error?.message,
    });
  }
});

export default router;