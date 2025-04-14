const Payment = require('../models/Payment');

class PaymentRepository {
  /**
   * Create a new payment record in the database.
   * @param {Object} paymentData - Data for the new payment.
   * @returns {Promise<Object>} The created payment instance.
   */
  async createPayment(paymentData) {
    return await Payment.create(paymentData);
  }

  /**
   * Retrieve all payment records from the database.
   * @returns {Promise<Array>} A list of all payment instances.
   */
  async getAllPayments() {
    return await Payment.findAll();
  }

  /**
   * Retrieve a specific payment by its ID.
   * @param {number} payment_id - ID of the payment to retrieve.
   * @returns {Promise<Object|null>} The payment instance or null if not found.
   */
  async getPaymentById(payment_id) {
    return await Payment.findByPk(payment_id);
  }

  /**
   * Update a specific payment by its ID.
   * @param {number} payment_id - ID of the payment to update.
   * @param {Object} updateData - Data to update the payment.
   * @returns {Promise<Object|null>} The updated payment or null if not found.
   */
  async updatePayment(payment_id, updateData) {
    const payment = await Payment.findByPk(payment_id);
    if (!payment) return null;
    await payment.update(updateData);
    return payment;
  }

  /**
   * Delete a specific payment by its ID.
   * @param {number} payment_id - ID of the payment to delete.
   * @returns {Promise<Object|null>} A message object if deleted, or null if not found.
   */
  async deletePayment(payment_id) {
    const payment = await Payment.findByPk(payment_id);
    if (!payment) return null;
    await payment.destroy();
    return { message: 'Payment deleted successfully' };
  }
}

module.exports = new PaymentRepository();
