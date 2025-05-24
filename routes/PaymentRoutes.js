const express = require('express');
const router = express.Router();
const { ensureAdmin } = require('../middleware/adminMiddleware');
const PaymentController = require('../controllers/PaymentController');
const { createPayment, updatePayment } = require('../validators/paymentValidator');

router.post('/', createPayment, ensureAdmin, PaymentController.createPayment);
router.get('/', ensureAdmin, PaymentController.getAllPayments);
router.get('/:payment_id', ensureAdmin, PaymentController.getPaymentById);
router.put('/:payment_id', ensureAdmin, updatePayment, PaymentController.updatePayment);
router.delete('/:payment_id', ensureAdmin, PaymentController.deletePayment);

module.exports = router;
