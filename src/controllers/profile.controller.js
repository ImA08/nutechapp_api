const db = require('../db/pg');
const bcrypt = require('bcrypt');


exports.updateProfile = async (req, res) => {
  const email = req.user.email;
  const { name, newEmail, newPassword } = req.body;

  if (!name && !newEmail && !newPassword) {
    return res.status(400).json({
      status: false,
      message: 'Tidak ada data yang diubah'
    });
  }

  const updateFields = [];
  const updateValues = [];
  let paramIndex = 1;

  // Validasi & update nama
  if (name) {
    updateFields.push(`name = $${paramIndex++}`);
    updateValues.push(name);
  }

  // Validasi & update email
  if (newEmail) {
    const emailRegex = /.+@.+\..+/;
    if (!emailRegex.test(newEmail)) {
      return res.status(400).json({
        status: false,
        message: 'Invalid email format'
      });
    }

    try {
      const emailExists = await db.query(
        'SELECT id FROM users WHERE email = $1 AND email != $2',
        [newEmail, email]
      );
      if (emailExists.rows.length > 0) {
        return res.status(409).json({
          status: false,
          message: 'Email sudah digunakan oleh pengguna lain'
        });
      }
    } catch (err) {
      return res.status(500).json({ status: false, message: 'Email check error' });
    }

    updateFields.push(`email = $${paramIndex++}`);
    updateValues.push(newEmail);
  }

  // Validasi & update password
  if (newPassword) {
    if (newPassword.length < 8) {
      return res.status(400).json({
        status: false,
        message: 'Password minimal 8 karakter'
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    updateFields.push(`password = $${paramIndex++}`);
    updateValues.push(hashedPassword);
  }

  // WHERE clause
  updateValues.push(email);
  const query = `
    UPDATE users
    SET ${updateFields.join(', ')}
    WHERE email = $${paramIndex}
    RETURNING name, email
  `;

  try {
    const result = await db.query(query, updateValues);

    if (result.rowCount === 0) {
      return res.status(404).json({ status: false, message: 'User tidak ditemukan' });
    }

    return res.status(200).json({
      status: true,
      message: 'Profil berhasil diperbarui',
      data: result.rows[0]
    });

  } catch (error) {
    console.error('Update profile error:', error);
    return res.status(500).json({ status: false, message: 'Internal Server Error' });
  }
};
  

  exports.updateProfileImage = async (req, res) => {
    const email = req.user.email;
  
    if (!req.file) {
      return res.status(400).json({ status: false, message: 'Profile image file is required' });
    }
  
    const profileImageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  
    try {
      const result = await db.query(
        `UPDATE users 
         SET profile_image = $1
         WHERE email = $2 
         RETURNING name, profile_image, email`,
        [profileImageUrl, email]
      );
  
      if (result.rowCount === 0) {
        return res.status(404).json({ status: false, message: 'User not found' });
      }
  
      return res.status(200).json({
        status: true,
        message: 'Foto profil berhasil diperbarui',
        data: result.rows[0]
      });
  
    } catch (error) {
      console.error('Update profile image error:', error);
      return res.status(500).json({ status: false, message: 'Internal Server Error' });
    }
  };
  