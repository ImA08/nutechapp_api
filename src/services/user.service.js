const db = require('../db/pg');


const getUserByEmail = async (email) => {
  const query = 'SELECT email, name, profile_image FROM users WHERE email = $1';
  const result = await db.query(query, [email]);
  return result.rows[0];
};

const getProfile = async (email) => {
  const user = await getUserByEmail(email);
  if (!user) {
    throw new Error('User not found');
  }

  return {
    email: user.email,
    name : user.name,
    profile_image: user.profile_image
  };
};

module.exports = {
  getProfile,
};
