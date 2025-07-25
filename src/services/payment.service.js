// src/services/payment.service.js
const db = require('../db/pg');

exports.createTransaction = async (userId, serviceCode) => {
  const client = await db.connect();
  try {
    await client.query('BEGIN');

    const serviceRes = await client.query(
      'SELECT * FROM services WHERE service_code = $1',
      [serviceCode]
    );

    if (serviceRes.rowCount === 0) {
      throw { status: 404, message: 'Service not found' };
    }

    const service = serviceRes.rows[0];

    const balanceRes = await client.query(
      'SELECT balance FROM balances WHERE user_id = $1',
      [userId]
    );

    const currentBalance = balanceRes.rows[0].balance;

    if (currentBalance < service.service_tariff) {
      throw { status: 400, message: 'Insufficient balance' };
    }

    const updatedBalance = currentBalance - service.service_tariff;

    await client.query(
      'UPDATE balances SET balance = $1, updated_at = NOW() WHERE user_id = $2',
      [updatedBalance, userId]
    );

    const transactionRes = await client.query(
      `INSERT INTO transactions (user_id, service_code, service_name, transaction_type, total_amount, created_at)
       VALUES ($1, $2, $3, $4, $5, NOW()) RETURNING *`,
      [userId, service.service_code, service.service_name, 'PAYMENT', service.service_tariff]
    );

    await client.query('COMMIT');
    return {
      status: true,
      message: 'Transaction successful',
      data: transactionRes.rows[0],
    };
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
};

exports.getTransactionHistory = async (userId) => {
  const result = await db.query(
    'SELECT * FROM transactions WHERE user_id = $1 ORDER BY created_at DESC',
    [userId]
  );
  return result.rows;
};
