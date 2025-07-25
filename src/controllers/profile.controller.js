const userService = require("../services/profile.service");
const Joi = require("joi");

const updateProfileSchema = Joi.object({
  name: Joi.string().min(3).messages({
    "string.base": "Nama harus berupa teks.",
    "string.min": "Nama harus memiliki minimal {#limit} karakter.",
    "string.empty": "Nama tidak boleh kosong.",
  }),
  newEmail: Joi.string().email().messages({
    "string.base": "Email baru harus berupa teks.",
    "string.email": "Format email baru tidak valid.",
    "string.empty": "Email baru tidak boleh kosong.",
  }),
  newPassword: Joi.string().min(8).messages({
    "string.base": "Kata sandi baru harus berupa teks.",
    "string.min": "Kata sandi baru minimal {#limit} karakter.",
    "string.empty": "Kata sandi baru tidak boleh kosong.",
  }),
})
  .or("name", "newEmail", "newPassword")
  .messages({
    "object.missing":
      "Tidak ada data yang diubah. Setidaknya salah satu dari 'name', 'newEmail', atau 'newPassword' harus disediakan.",
  });

exports.updateProfile = async (req, res) => {
  const email = req.user.email;

  const { error } = updateProfileSchema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    const errorMessage = error.details
      .map((detail) => detail.message)
      .join(", ");
    return res.status(400).json({
      status: false,
      message: errorMessage,
    });
  }

  const { name, newEmail, newPassword } = req.body;

  try {
    const { user: updatedUser, token: newToken } =
      await userService.updateProfile(email, {
        name,
        newEmail,
        newPassword,
      });
    return res.status(200).json({
      status: true,
      message: "Profil berhasil diperbarui.",
      data: updatedUser,
      token: newToken,
    });
  } catch (err) {
    if (err.message === "Tidak ada data yang diubah.") {
      return res.status(400).json({ status: false, message: err.message });
    }
    if (err.message === "Email sudah digunakan oleh pengguna lain.") {
      return res.status(409).json({ status: false, message: err.message });
    }
    if (err.message === "Pengguna tidak ditemukan.") {
      return res.status(404).json({ status: false, message: err.message });
    }

    handleServiceError(res, err, "Gagal memperbarui profil.");
  }
};

exports.updateProfileImage = async (req, res) => {
  const email = req.user.email;

  if (!req.file) {
    return res
      .status(400)
      .json({ status: false, message: "File gambar profil diperlukan." });
  }

  try {
    const { user: updatedUser } = await userService.updateProfileImage(
      email,
      req.file.filename,
      req
    );
    return res.status(200).json({
      status: true,
      message: "Foto profil berhasil diperbarui.",
      data: updatedUser,
    });
  } catch (err) {
    if (err.message === "File gambar profil diperlukan.") {
      return res.status(400).json({ status: false, message: err.message });
    }
    if (err.message === "Pengguna tidak ditemukan.") {
      return res.status(404).json({ status: false, message: err.message });
    }

    handleServiceError(res, err, "Gagal memperbarui foto profil.");
  }
};
