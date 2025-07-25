const db = require('../db/pg');

const getAllBanners = async () => {
  const result = await db.query('SELECT banner_image FROM banners');
  return result.rows;
};

module.exports = {
  getAllBanners,
};
