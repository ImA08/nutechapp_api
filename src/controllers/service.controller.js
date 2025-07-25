const serviceService = require("../services/service.service");

const getServiceList = async (req, res) => {
  try {
    const services = await serviceService.getServices();

    res.status(200).json({
      status: true,
      message: "Get service list success",
      data: services,
    });
  } catch (error) {
    console.error("Error get services:", error);
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  getServiceList,
};
