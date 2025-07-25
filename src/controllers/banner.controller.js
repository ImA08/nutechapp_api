const bannerService = require('../services/banner.service');

const getBannerList = async (req, res) => {
  try {
    const banners = await bannerService.getBanners();

    res.status(200).json({
      status: true,
      message: 'Get banner success',
      data: banners,
    });
  } catch (error) {
    console.error('Error get banners:', error);
    res.status(500).json({
      status: false,
      message: 'Internal Server Error',
    });
  }
};

module.exports = {
  getBannerList,
};
