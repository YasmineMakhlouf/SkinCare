const PaymentService = require('../services/PaymentService');

class PaymentController {

  /**
   * Create a new payment.
   * @param {Object} req - Express request object containing payment data in req.body.
   * @param {Object} res - Express response object.
   * @returns {Object} The created payment.
   */
  async createPayment(req, res) {
    try {
      const payment = await PaymentService.createPayment(req.body);
      return res.status(201).json(payment);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  /**
   * Get all payments.
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   * @returns {Array} List of all payments.
   */
  async getAllPayments(req, res) {
    try {
      const payments = await PaymentService.getAllPayments();
      return res.status(200).json(payments);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  /**
   * Get a payment by ID.
   * @param {Object} req - Express request object with payment_id in req.params.
   * @param {Object} res - Express response object.
   * @returns {Object} The payment data or 404 if not found.
   */
  async getPaymentById(req, res) {
    try {
      const { payment_id } = req.params;
      const payment = await PaymentService.getPaymentById(payment_id);
      if (!payment) return res.status(404).json({ message: 'Payment not found' });
      return res.status(200).json(payment);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  /**
   * Update a payment by ID.
   * @param {Object} req - Express request object with payment_id in req.params and update data in req.body.
   * @param {Object} res - Express response object.
   * @returns {Object} The updated payment.
   */
  async updatePayment(req, res) {
    try {
      const { payment_id } = req.params;
      const payment = await PaymentService.updatePayment(payment_id, req.body);
      return res.status(200).json(payment);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  /**
   * Delete a payment by ID.
   * @param {Object} req - Express request object with payment_id in req.params.
   * @param {Object} res - Express response object.
   * @returns {Object} The result of the delete operation.
   */
  async deletePayment(req, res) {
    try {
      const { payment_id } = req.params;
      const result = await PaymentService.deletePayment(payment_id);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new PaymentController();
