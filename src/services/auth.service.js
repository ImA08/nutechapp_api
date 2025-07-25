const {pool} = require('../db/pg');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { createUser, findUserByEmail } = require('../repositories/auth.repository');

exports.register = async ({ name, email, password}, req) => {
  const client = await pool.connect(); 
  try {
    await client.query('BEGIN');

    const hashed = await bcrypt.hash(password, 10);
    const defaultImage = `${req.protocol}://${req.get('host')}/uploads/default.png`;
    const userResult = await client.query(
      `INSERT INTO users (email, password, name, profile_image) VALUES ($1, $2, $3, $4) RETURNING id`,
      [email, hashed, name, defaultImage]
    );

    const userId = userResult.rows[0].id;

    await client.query(
      `INSERT INTO balances (user_id, balance) VALUES ($1, 0)`,
      [userId]
    );

    await client.query('COMMIT');
    return userId;
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
};

exports.login = async ({ email, password }) => {
  const user = await findUserByEmail(email);
  if (!user) throw new Error('User not found');
  if (!(await bcrypt.compare(password, user.password))) throw new Error('Wrong password');
  return jwt.sign({ id: user.id, email }, process.env.JWT_SECRET, { expiresIn: '12h' });
};
