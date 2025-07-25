const serviceRepo = require('../repositories//service.repository');

const getServices = async () => {
  const services = await serviceRepo.getAllServices();

  return services.map((service) => ({
    service_code: service.service_code,
    service_name: service.service_name,
    service_icon: service.service_icon,
  }));
};

module.exports = {
  getServices,
};
