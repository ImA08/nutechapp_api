const db = require('../db/pg');


const getUserByEmail = async (email) => {
  const query = 'SELECT email, name, profile_image FROM users WHERE email = $1';
  const result = await db.query(query, [email]);
  return result.rows[0];
};

module.exports = {
  getUserByEmail,
};
