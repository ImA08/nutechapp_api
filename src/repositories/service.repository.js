const db = require('../db/pg');


const getAllServices = async () => {
  const result = await db.query('SELECT service_code, service_name, service_icon FROM services');
  return result.rows;
};

module.exports = {
  getAllServices,
};
