const { body, validationResult } = require('express-validator');

exports.createReview = [
  body('user_id')
    .notEmpty().withMessage('User ID is required')
    .isInt().withMessage('User ID must be an integer'),
  body('service_id')
    .notEmpty().withMessage('Service ID is required')
    .isInt().withMessage('Service ID must be an integer'),
  body('review_rating')
    .optional()
    .isInt({ min: 1, max: 5 }).withMessage('Review rating must be between 1 and 5'),
  body('review_text')
    .optional()
    .isString().withMessage('Review text must be a string'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  }
];

exports.updateReview = [
  body('user_id')
    .optional()
    .isInt().withMessage('User ID must be an integer'),
  body('service_id')
    .optional()
    .isInt().withMessage('Service ID must be an integer'),
  body('review_rating')
    .optional()
    .isInt({ min: 1, max: 5 }).withMessage('Review rating must be between 1 and 5'),
  body('review_text')
    .optional()
    .isString().withMessage('Review text must be a string'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  }
];
