const { body, validationResult } = require('express-validator');

exports.createAppointment = [
  body('appointment_date')
    .notEmpty().withMessage('Appointment date is required')
    .isISO8601().withMessage('Appointment date must be a valid date'),
  body('user_id')
    .notEmpty().withMessage('User ID is required')
    .isInt().withMessage('User ID must be an integer'),
  body('service_id')
    .notEmpty().withMessage('Service ID is required')
    .isInt().withMessage('Service ID must be an integer'),
  body('appointment_status')
    .optional()
    .isIn(['pending', 'confirmed', 'rejected', 'cancelled']).withMessage('Invalid appointment status'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  }
];

exports.updateAppointment = [
  body('appointment_date')
    .optional()
    .isISO8601().withMessage('Appointment date must be a valid date'),
  body('user_id')
    .optional()
    .isInt().withMessage('User ID must be an integer'),
  body('service_id')
    .optional()
    .isInt().withMessage('Service ID must be an integer'),
  body('appointment_status')
    .optional()
    .isIn(['pending', 'confirmed', 'rejected', 'cancelled']).withMessage('Invalid appointment status'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  }
];
