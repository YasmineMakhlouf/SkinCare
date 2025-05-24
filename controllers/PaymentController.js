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
      return res.redirect('/payment');
    } catch (error) {
      return res.status(500).render('error', { error: error.message });
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
      return res.render('payments', { payments });
    } catch (error) {
      return res.render('error', { error: error.message });
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
      if (!payment) return res.render('notfound', { message: 'Payment not found' });
      return res.render('paymentDetails', { payment });
    } catch (error) {
      return res.render('error', { error: error.message });
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
      return res.render('paymentUpdated', { payment });
    } catch (error) {
      return res.render('error', { error: error.message });
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
      return res.render('paymentDeleted', { result });
    } catch (error) {
      return res.render('error', { error: error.message });
    }
  }

}

module.exports = new PaymentController();
