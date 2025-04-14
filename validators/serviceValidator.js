const { body, validationResult } = require('express-validator');

exports.createService = [
  body('service_name')
    .notEmpty().withMessage('Service name is required'),
  body('service_price')
    .notEmpty().withMessage('Service price is required')
    .isFloat({ gt: 0 }).withMessage('Service price must be a positive number'),
  body('service_description')
    .notEmpty().withMessage('Service description is required'),
  body('service_duration')
    .notEmpty().withMessage('Service duration is required')
    .isInt({ gt: 0 }).withMessage('Service duration must be a positive integer'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  }
];

exports.updateService = [
  body('service_name')
    .optional()
    .notEmpty().withMessage('Service name cannot be empty'),
  body('service_price')
    .optional()
    .isFloat({ gt: 0 }).withMessage('Service price must be a positive number'),
  body('service_description')
    .optional()
    .notEmpty().withMessage('Service description cannot be empty'),
  body('service_duration')
    .optional()
    .isInt({ gt: 0 }).withMessage('Service duration must be a positive integer'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  }
];
