const authService = require('../services/auth.service');

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || name.trim().length < 3) {
    return res.status(400).json({ status: false, message: 'Name is required and must be at least 3 characters' });
  }

  if (!/.+@.+\..+/.test(email)) {
    return res.status(400).json({ status: false, message: 'Invalid email' });
  }

  if (!password || password.length < 8) {
    return res.status(400).json({ status: false, message: 'Password min 8 char' });
  }

  try {
    await authService.register({ name, email, password }, req);
    res.json({ status: true, message: 'Register successful' });
  } catch (e) {
    res.status(500).json({ status: false, message: e.message });
  }
};


exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!/.+@.+\..+/.test(email)) return res.status(400).json({ status: false, message: 'Invalid email' });
  if (password.length < 8) return res.status(400).json({ status: false, message: 'Password min 8 char' });
  try {
    const token = await authService.login(req.body);
    res.json({ status: true, message: 'Login successful', data: { token } });
  } catch (e) {
    res.status(401).json({ status: false, message: e.message });
  }
};
