const { pool } = require("../db/pg");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const findUserByEmail = async (email) => {
  const result = await pool.query("SELECT * FROM users WHERE email=$1", [
    email,
  ]);
  return result.rows[0];
};

class AuthService {
  async register({ name, email, password }) {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      const existingUser = await findUserByEmail(email);
      if (existingUser) {
        throw new Error("Email sudah terdaftar. Silakan gunakan email lain.");
      }

      const hashed = await bcrypt.hash(password, 10);

      const BASE_URL = process.env.APP_BASE_URL;
      if (!BASE_URL) {
        console.warn(
          "APP_BASE_URL not set in environment variables. Defaulting to a placeholder."
        );
      }
      const defaultImage = `${
        BASE_URL || "http://localhost:3000"
      }/uploads/default.png`;

      const userResult = await client.query(
        `INSERT INTO users (email, password, name, profile_image) VALUES ($1, $2, $3, $4) RETURNING id`,
        [email, hashed, name, defaultImage]
      );

      const userId = userResult.rows[0].id;

      await client.query(
        `INSERT INTO balances (user_id, balance) VALUES ($1, 0)`,
        [userId]
      );

      await client.query("COMMIT");
      return userId;
    } catch (err) {
      await client.query("ROLLBACK");
      throw err;
    } finally {
      client.release();
    }
  }

  async login({ email, password }) {
    const user = await findUserByEmail(email);

    if (!user) {
      throw new Error("Email tidak terdaftar.");
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new Error("Kata sandi salah.");
    }

    return jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "12h",
      }
    );
  }
}

module.exports = new AuthService();
