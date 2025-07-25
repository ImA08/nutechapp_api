const topupService = require("../services/topup.service");
const Joi = require("joi");

const handleServiceError = (
  res,
  error,
  defaultMessage = "Terjadi kesalahan pada server. Silakan coba lagi nanti."
) => {
  console.error("Controller Error:", error.message);
  res.status(500).json({ status: false, message: defaultMessage });
};

const topupSchema = Joi.object({
  amount: Joi.number().min(10000).required().messages({
    "number.base": "Nominal top up harus berupa angka.",
    "number.min": "Nominal top up minimal {{#limit}}.",
    "any.required": "Nominal top up diperlukan.",
    "number.empty": "Nominal top up tidak boleh kosong.",
  }),
});

exports.topup = async (req, res) => {
  const userId = req.user.id;

  const { error, value } = topupSchema.validate(req.body);

  if (error) {
    const errorMessage = error.details
      .map((detail) => detail.message)
      .join(", ");
    return res.status(400).json({
      status: false,
      message: errorMessage,
    });
  }

  const { amount } = value;

  try {
    const { message, newBalance, invoiceNumber } =
      await topupService.performTopup(userId, amount);

    res.status(200).json({
      status: true,
      message: message,
      data: {
        newBalance: newBalance,
        invoiceNumber: invoiceNumber,
      },
    });
  } catch (err) {
    if (err.message === "User tidak ditemukan di balances.") {
      return res.status(404).json({ status: false, message: err.message });
    }

    handleServiceError(res, err, "Top up gagal. Silakan coba lagi nanti.");
  }
};
