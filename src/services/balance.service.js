const db = require('../db/pg');

async function getBalance(userId) {
  const query = 'SELECT balance FROM balances WHERE user_id = $1';
  const values = [userId];

  const result = await db.query(query, values);
  return result.rows[0] || null;
}

module.exports = {
  getBalance
};
