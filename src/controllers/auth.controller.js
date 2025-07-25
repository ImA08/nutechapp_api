const authService = require("../services/auth.service");
const Joi = require("joi");

const handleServiceError = (
  res,
  error,
  defaultMessage = "Terjadi kesalahan pada server. Silakan coba lagi nanti."
) => {
  console.error("Service Error:", error.message);
  res.status(500).json({ status: false, message: defaultMessage });
};

// --- Skema Validasi Joi ---
const registerSchema = Joi.object({
  name: Joi.string().min(3).required().messages({
    "string.base": "Nama harus berupa teks.",
    "string.min": "Nama harus memiliki minimal {#limit} karakter.",
    "string.empty": "Nama diperlukan.",
    "any.required": "Nama diperlukan.",
  }),
  email: Joi.string().email().required().messages({
    "string.base": "Email harus berupa teks.",
    "string.email": "Format email tidak valid.",
    "string.empty": "Email diperlukan.",
    "any.required": "Email diperlukan.",
  }),
  password: Joi.string().min(8).required().messages({
    "string.base": "Kata sandi harus berupa teks.",
    "string.min": "Kata sandi minimal {#limit} karakter.",
    "string.empty": "Kata sandi diperlukan.",
    "any.required": "Kata sandi diperlukan.",
  }),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.base": "Email harus berupa teks.",
    "string.email": "Format email tidak valid.",
    "string.empty": "Email diperlukan.",
    "any.required": "Email diperlukan.",
  }),
  password: Joi.string().min(8).required().messages({
    "string.base": "Kata sandi harus berupa teks.",
    "string.min": "Kata sandi minimal {#limit} karakter.",
    "string.empty": "Kata sandi diperlukan.",
    "any.required": "Kata sandi diperlukan.",
  }),
});

// --- Controller Functions ---

exports.register = async (req, res) => {
  const { error } = registerSchema.validate(req.body, { abortEarly: false });

  if (error) {
    const errorMessage = error.details
      .map((detail) => detail.message)
      .join(", ");
    return res.status(400).json({
      status: false,
      message: errorMessage,
    });
  }

  const { name, email, password } = req.body;

  try {
    await authService.register({ name, email, password }, req);
    res.json({ status: true, message: "Pendaftaran berhasil!" });
  } catch (err) {
    if (err.message === "Email sudah terdaftar. Silakan gunakan email lain.") {
      return res.status(409).json({ status: false, message: err.message });
    }
    handleServiceError(res, err, "Gagal mendaftar. Silakan coba lagi nanti.");
  }
};

exports.login = async (req, res) => {
  const { error } = loginSchema.validate(req.body, { abortEarly: false });

  if (error) {
    const errorMessage = error.details
      .map((detail) => detail.message)
      .join(", ");
    return res.status(400).json({
      status: false,
      message: errorMessage,
    });
  }

  const { email, password } = req.body;

  try {
    const token = await authService.login({ email, password });
    res.json({ status: true, message: "Login berhasil!", data: { token } });
  } catch (err) {
    if (
      err.message === "Email tidak terdaftar." ||
      err.message === "Kata sandi salah."
    ) {
      return res
        .status(401)
        .json({ status: false, message: "Email atau kata sandi salah." });
    }

    handleServiceError(res, err, "Gagal login. Silakan coba lagi nanti.");
  }
};
