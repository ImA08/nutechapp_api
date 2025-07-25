const db = require("../db/pg");

const getAllServices = async () => {
  const result = await db.query(
    "SELECT service_code, service_name, service_icon FROM services"
  );
  return result.rows;
};

const getServices = async () => {
  const services = await getAllServices();

  return services.map((service) => ({
    service_code: service.service_code,
    service_name: service.service_name,
    service_icon: service.service_icon,
  }));
};

module.exports = {
  getServices,
};
