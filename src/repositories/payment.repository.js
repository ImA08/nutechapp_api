const db = require('../db/pg');

exports.getTransactionHistory = async (userId) => {
  const query = `
    SELECT transaction_type, description, amount, transaction_date
    FROM transactions
    WHERE user_id = $1
    ORDER BY transaction_date DESC
  `;
  const { rows } = await db.query(query, [userId]);
  return rows;
};
