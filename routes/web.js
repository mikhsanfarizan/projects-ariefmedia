import "dotenv/config";
import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
    res.render("home", {
        meta: {
            title: `Home - ${process.env.SITE_TITLE}`,
            description: process.env.SITE_DESCRIPTION,
            site_text_logo: process.env.SITE_TEXT_LOGO,
            whatsapp_number: process.env.SITE_WHATSAPP_NUMBER
        }
    });
});

export default router;