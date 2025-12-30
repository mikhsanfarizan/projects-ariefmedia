import fs from "fs";
import path from "path";
import { __dirname, cleanAndLimitText } from "../utils/helper.js";

const getProduct = async () => {
    const productsFile = path.join(__dirname, "../data/products.json")
    const rawProducts = await fs.promises.readFile(productsFile, "utf-8");
    const products = JSON.parse(rawProducts);
    return products;
}

const controller = {
    productList: async (req, res) => {
        try {
            const products = await getProduct();
            return res.json(products);
        } catch (error) {
            return res
                .status(500)
                .json({
                    status: false,
                    error: error?.message
                });
        }
    },
    productDetail: async (req, res) => {
        const { slug } = req.params;
        const products = await getProduct();
        const product = products?.find(item => item?.slug === slug);
        return res.render("product-detail", {
            product,
            meta: {
                ...res.locals.meta,
                title: `${product?.product_name} - ${res.locals.meta?.site_title}`,
                description: cleanAndLimitText(product?.description)
            }
        });
    }
};

export default controller;