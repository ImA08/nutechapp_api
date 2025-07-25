const db = require('../shared/db/pg'); // koneksi PG Pool

exports.updateProfileImage = async (userId, profileImage) => {
  const query = `UPDATE users SET profile_image = $1 WHERE id = $2`;
  await db.query(query, [profileImage, userId]);
};
