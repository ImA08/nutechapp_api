const db = require('../db/pg');



exports.topup = async (req, res) => {
  const { amount } = req.body;
  const userId = req.user.id;

  if (!amount || amount <= 0) {
    return res.status(400).json({ message: 'Nominal tidak valid' });
  }

  try {
    

    // Update balance
    const result = await db.query(
      `UPDATE balances SET balance = balance + $1, updated_at = NOW() WHERE user_id = $2`,
      [amount, userId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'User tidak ditemukan di balances' });
    }

    const invoiceNumber = `INV-${Date.now()}`;

    // Insert transaction
    await db.query(
      `INSERT INTO transactions (user_id, service_code, transaction_type, total_amount, invoice_number) 
       VALUES ($1, $2, 'TOPUP', $3, $4)`,
      [userId, 'TOPUP', amount, invoiceNumber]
    );

    res.json({ message: 'Top up berhasil' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Top up gagal', errorMsg : error });
  }
};
