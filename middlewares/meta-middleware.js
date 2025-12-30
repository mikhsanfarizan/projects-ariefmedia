export const addMeta = (pageTitle) => {
  return (req, res, next) => {
    res.locals.meta = {
      site_title: process.env.SITE_TITLE,
      title: `${pageTitle} - ${process.env.SITE_TITLE}`,
      description: process.env.SITE_DESCRIPTION,
      site_text_logo: process.env.SITE_TEXT_LOGO,
      whatsapp_number: process.env.SITE_WHATSAPP_NUMBER,
    };
    next();
  };
};