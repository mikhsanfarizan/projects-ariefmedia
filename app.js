import "dotenv/config"
import express from "express";
import expressLayouts from 'express-ejs-layouts';
import path from "path";
import { __dirname } from "./utils/helper.js";

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "..", "views"));
app.use(expressLayouts);
app.set('layout', 'templates/main-layout');
app.use(express.static(path.join(__dirname, "..", "public")));

import webRoutes from "./routes/web.js";
import productRoutes from "./routes/product.js";

app.use("/", webRoutes);
app.use("/product", productRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log('Server running at http://localhost:3000')
);
