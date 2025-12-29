import express from "express";
import expressLayouts from 'express-ejs-layouts';
import path from "path";
import { fileURLToPath } from "url";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "views"));
app.use(expressLayouts);
app.set('layout', 'templates/main-layout');
app.use(express.static(path.join(__dirname, "public")));

import webRoutes from "./routes/web.js";

app.use("/", webRoutes);

app.listen(3000, () =>
  console.log('Server running at http://localhost:3000')
);
