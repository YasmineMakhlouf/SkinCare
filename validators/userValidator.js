const { body, validationResult } = require('express-validator');

exports.createUser = [
  body('user_name')
    .notEmpty().withMessage('User name is required'),
  body('user_email')
    .isEmail().withMessage('A valid email is required'),
  body('user_password')
    .notEmpty().withMessage('Password is required'),
  body('user_phone')
    .notEmpty().withMessage('Phone number is required'),
  // user_address is optional and does not require validation
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  }
];

exports.updateUser = [
  body('user_name')
    .optional()
    .notEmpty().withMessage('User name cannot be empty'),
  body('user_email')
    .optional()
    .isEmail().withMessage('A valid email is required'),
  body('user_password')
    .optional()
    .notEmpty().withMessage('Password cannot be empty'),
  body('user_phone')
    .optional()
    .notEmpty().withMessage('Phone number cannot be empty'),
  // user_address is optional
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  }
];
