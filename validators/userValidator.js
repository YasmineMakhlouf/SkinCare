const { body, validationResult } = require('express-validator');

exports.createUser = [
  body('user_name')
    .notEmpty().withMessage('User name is required'),
  body('user_email')
    .isEmail().withMessage('A valid email is required'),
  body('user_password')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('user_phone')
    .notEmpty().withMessage('Phone number is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).render('register', { errorMessage: errors.array()[0].msg });
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

exports.loginValidator = [
  body('user_email')
    .isEmail().withMessage('Please provide a valid email address')
    .notEmpty().withMessage('Email is required'),

  body('user_password')
    .notEmpty().withMessage('Password is required'),

  // Handle validation errors
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];