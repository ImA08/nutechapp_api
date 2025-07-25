const userService = require('../services/user.service');

const getProfile = async (req, res) => {
  try {
    const email = req.user.email;
    const profile = await userService.getProfile(email);

    res.status(200).json({
      status: true,
      message: 'Get profile success',
      data: profile
    });
  } catch (error) {
    console.error('Error get profile:', error);
    res.status(500).json({
      status: false,
      message: 'Internal Server Error'
    });
  }
};

module.exports = {
  getProfile,
};
