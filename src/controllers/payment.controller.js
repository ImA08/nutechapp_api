const paymentService = require("../services/payment.service");

exports.createTransaction = async (req, res) => {
  const { service_code } = req.body;
  const userId = req.user.id;

  try {
    const transaction = await paymentService.createTransaction(
      userId,
      service_code
    );
    res.status(200).json(transaction);
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ status: false, message: error.message });
  }
};

exports.getTransactionHistory = async (req, res) => {
  const userId = req.user.id;

  try {
    const history = await paymentService.getTransactionHistory(userId);
    res.status(200).json({ status: true, data: history });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};
