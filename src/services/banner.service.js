const bannerRepo = require('../repositories//banner.repository');

const getBanners = async () => {
  const banners = await bannerRepo.getAllBanners();

  return banners.map((banner) => ({
    banner_image: banner.banner_image,
  }));
};

module.exports = {
  getBanners,
};
