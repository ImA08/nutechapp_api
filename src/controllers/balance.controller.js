const balanceService = require("../services/balance.service");
exports.getBalance = async (req, res) => {
  try {
    const balance = await balanceService.getBalance(req.user.id);
    res.json({ status: true, data: { balance } });
  } catch {
    res.status(500).json({ status: false, message: "Failed" });
  }
};
