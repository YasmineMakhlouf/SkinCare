const PaymentRepository = require('../repositories/PaymentRepository');

class PaymentService {
  /**
   * Creates a new payment record.
   * 
   * @param {Object} paymentData - The data of the payment to create.
   * @returns {Promise<Object>} - The created payment instance.
   * @throws {Error} - Throws an error if payment creation fails.
   */
  async createPayment(paymentData) {
    try {
      return await PaymentRepository.createPayment(paymentData);
    } catch (error) {
      throw new Error(`Failed to create payment: ${error.message}`);
    }
  }

  /**
   * Retrieves all payment records.
   * 
   * @returns {Promise<Array>} - An array of all payments.
   * @throws {Error} - Throws an error if retrieving payments fails.
   */
  async getAllPayments() {
    try {
      return await PaymentRepository.getAllPayments();
    } catch (error) {
      throw new Error(`Failed to retrieve payments: ${error.message}`);
    }
  }

  /**
   * Retrieves a payment by its unique ID.
   * 
   * @param {number} payment_id - The unique identifier of the payment.
   * @returns {Promise<Object|null>} - The payment instance if found, or null if not found.
   * @throws {Error} - Throws an error if retrieving the payment fails.
   */
  async getPaymentById(payment_id) {
    try {
      const payment = await PaymentRepository.getPaymentById(payment_id);
      return payment;
    } catch (error) {
      throw new Error(`Failed to retrieve payment: ${error.message}`);
    }
  }

  /**
   * Updates an existing payment record by its ID.
   * 
   * @param {number} payment_id - The unique identifier of the payment to update.
   * @param {Object} updateData - The fields to update in the payment record.
   * @returns {Promise<Object|null>} - The updated payment instance if successful, or null if the payment wasn't found.
   * @throws {Error} - Throws an error if updating the payment fails.
   */
  async updatePayment(payment_id, updateData) {
    try {
      const updatedPayment = await PaymentRepository.updatePayment(payment_id, updateData);
      if (!updatedPayment) {
        throw new Error('Payment not found');
      }
      return updatedPayment;
    } catch (error) {
      throw new Error(`Failed to update payment: ${error.message}`);
    }
  }

  /**
   * Deletes a payment record by its ID.
   * 
   * @param {number} payment_id - The unique identifier of the payment to delete.
   * @returns {Promise<Object>} - A success message if the payment is deleted, or an error message if not found.
   * @throws {Error} - Throws an error if deleting the payment fails.
   */
  async deletePayment(payment_id) {
    try {
      const result = await PaymentRepository.deletePayment(payment_id);
      if (!result) {
        throw new Error('Payment not found');
      }
      return result;
    } catch (error) {
      throw new Error(`Failed to delete payment: ${error.message}`);
    }
  }
}

module.exports = new PaymentService();
