const db = require('../db/pg');

exports.createTransaction = async (req, res) => {
  const { service_code } = req.body;
  const userId = req.user.id;

  if (!service_code) {
    return res.status(400).json({ status: false, message: 'Service code tidak boleh kosong' });
  }

  try {
    // 1. Ambil harga service
    const serviceResult = await db.query(
      `SELECT service_code, service_name, service_tariff FROM services WHERE service_code = $1`,
      [service_code]
    );

    if (serviceResult.rowCount === 0) {
      return res.status(404).json({ status: false, message: 'Service tidak ditemukan' });
    }

    const service = serviceResult.rows[0];

    // 2. Ambil saldo user
    const balanceResult = await db.query(`SELECT balance FROM balances WHERE user_id = $1`, [userId]);

    if (balanceResult.rowCount === 0) {
      return res.status(404).json({ status: false, message: 'User tidak ditemukan di balances' });
    }

    const currentBalance = parseFloat(balanceResult.rows[0].balance);
    const price = parseFloat(service.service_tariff);

    // 3. Cek apakah saldo cukup
    if (currentBalance < price) {
      return res.status(400).json({ status: false, message: 'Saldo tidak mencukupi' });
    }

    // 4. Kurangi saldo
    await db.query(`UPDATE balances SET balance = balance - $1, updated_at = NOW() WHERE user_id = $2`, [price, userId]);

    // 5. Simpan transaksi
    const invoiceNumber = `INV-${Date.now()}`;
    await db.query(
      `INSERT INTO transactions (user_id, service_code, transaction_type, total_amount, invoice_number)
       VALUES ($1, $2, 'PAYMENT', $3, $4)`,
      [userId, service_code, price, invoiceNumber]
    );

    // 6. Kirim response sukses
    res.status(200).json({
      status: true,
      message: 'Transaksi berhasil',
      data: {
        invoice_number: invoiceNumber
      }
    });

  } catch (err) {
    console.error('Error transaksi:', err);
    res.status(500).json({ status: false, message: 'Terjadi kesalahan pada server' });
  }
};
