const express = require('express');
const router = express.Router();
const { ensureAdmin } = require('../middleware/adminMiddleware');
const ReviewController = require('../controllers/ReviewController');
const { createReview, updateReview } = require('../validators/reviewValidator');

router.post('/', createReview, ensureAdmin, ReviewController.createReview);
router.get('/', ensureAdmin, ReviewController.getAllReviews);
router.get('/:review_id', ensureAdmin, ReviewController.getReviewById);
router.put('/:review_id', updateReview, ensureAdmin, ReviewController.updateReview);
router.delete('/:review_id', ensureAdmin, ReviewController.deleteReview);

module.exports = router;
