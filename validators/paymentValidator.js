const { body, validationResult } = require('express-validator');

exports.createPayment = [
  body('appointment_id')
    .notEmpty().withMessage('Appointment ID is required')
    .isInt().withMessage('Appointment ID must be an integer'),
  body('payment_amount')
    .notEmpty().withMessage('Payment amount is required')
    .isFloat({ gt: 0 }).withMessage('Payment amount must be a positive number'),
  body('user_id')
    .optional()
    .isInt().withMessage('User ID must be an integer'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  }
];

exports.updatePayment = [
  body('appointment_id')
    .optional()
    .isInt().withMessage('Appointment ID must be an integer'),
  body('payment_amount')
    .optional()
    .isFloat({ gt: 0 }).withMessage('Payment amount must be a positive number'),
  body('user_id')
    .optional()
    .isInt().withMessage('User ID must be an integer'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  }
];
