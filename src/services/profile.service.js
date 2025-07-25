const db = require("../db/pg");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const BASE_URL = process.env.APP_BASE_URL || "http://localhost:3000";

class UserService {
  async updateProfile(currentEmail, { name, newEmail, newPassword }) {
    if (!name && !newEmail && !newPassword) {
      throw new Error("Tidak ada data yang diubah.");
    }

    const updateFields = [];
    const updateValues = [];
    let paramIndex = 1;

    if (name) {
      updateFields.push(`name = $${paramIndex++}`);
      updateValues.push(name);
    }

    if (newEmail) {
      const emailExistsResult = await db.query(
        "SELECT id FROM users WHERE email = $1 AND email != $2",
        [newEmail, currentEmail]
      );
      if (emailExistsResult.rows.length > 0) {
        throw new Error("Email sudah digunakan oleh pengguna lain.");
      }
      updateFields.push(`email = $${paramIndex++}`);
      updateValues.push(newEmail);
    }

    if (newPassword) {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      updateFields.push(`password = $${paramIndex++}`);
      updateValues.push(hashedPassword);
    }

    if (updateFields.length === 0) {
      throw new Error("Tidak ada data yang diubah.");
    }

    updateValues.push(currentEmail);
    const query = `
      UPDATE users
      SET ${updateFields.join(", ")}
      WHERE email = $${paramIndex}
      RETURNING id, name, email, profile_image
    `;

    const result = await db.query(query, updateValues);

    const updatedUser = result.rows[0];

    if (!updatedUser) {
      throw new Error("Pengguna tidak ditemukan.");
    }

    const newToken = jwt.sign(
      { id: updatedUser.id, email: updatedUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "12h" }
    );

    return { user: updatedUser, token: newToken };
  }

  async updateProfileImage(email, filename, req) {
    if (!filename) {
      throw new Error("File gambar profil diperlukan.");
    }

    const profileImageUrl = `${BASE_URL}/uploads/${filename}`;

    const result = await db.query(
      `UPDATE users
       SET profile_image = $1
       WHERE email = $2
       RETURNING name, profile_image, email`,
      [profileImageUrl, email]
    );

    const updatedUser = result.rows[0];

    if (result.rowCount === 0) {
      throw new Error("Pengguna tidak ditemukan.");
    }

    return { user: updatedUser };
  }
}

module.exports = new UserService();
