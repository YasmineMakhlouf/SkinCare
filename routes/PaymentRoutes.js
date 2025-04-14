const express = require('express');
const router = express.Router();
const PaymentController = require('../controllers/PaymentController');
const { createPayment, updatePayment } = require('../validators/paymentValidator');

router.post('/', createPayment, PaymentController.createPayment);
router.get('/', PaymentController.getAllPayments);
router.get('/:payment_id', PaymentController.getPaymentById);
router.put('/:payment_id', updatePayment, PaymentController.updatePayment);
router.delete('/:payment_id', PaymentController.deletePayment);

module.exports = router;
