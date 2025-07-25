const db = require("../db/pg");

const getAllBanners = async () => {
  const result = await db.query("SELECT banner_image FROM banners");
  return result.rows;
};

const getBanners = async () => {
  const banners = await getAllBanners();

  return banners.map((banner) => ({
    banner_image: banner.banner_image,
  }));
};

module.exports = {
  getBanners,
};
