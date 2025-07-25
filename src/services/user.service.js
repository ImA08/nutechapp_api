const userRepo = require('../repositories/user.repository');

const getProfile = async (email) => {
  const user = await userRepo.getUserByEmail(email);
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
