const db = require("../db/pg");

class TopupService {
  async performTopup(userId, amount) {
    const client = await db.pool.connect();
    try {
      await client.query("BEGIN");

      const updateBalanceResult = await client.query(
        `UPDATE balances SET balance = balance + $1, updated_at = NOW() WHERE user_id = $2 RETURNING balance`,
        [amount, userId]
      );

      if (updateBalanceResult.rowCount === 0) {
        throw new Error("User tidak ditemukan di balances.");
      }

      const newBalance = updateBalanceResult.rows[0].balance;

      const invoiceNumber = `INV-${Date.now()}-${userId}`;

      await client.query(
        `INSERT INTO transactions (id, user_id, service_code, transaction_type, total_amount, invoice_number)
         VALUES (uuid_generate_v4(), $1, $2, $3, $4, $5)`,
        [userId, "TOPUP", "TOPUP", amount, invoiceNumber]
      );

      await client.query("COMMIT");
      return { message: "Top up berhasil", newBalance, invoiceNumber };
    } catch (error) {
      await client.query("ROLLBACK");
      console.error("Error in TopupService.performTopup:", error.message);
      throw error;
    } finally {
      client.release();
    }
  }
}

module.exports = new TopupService();
