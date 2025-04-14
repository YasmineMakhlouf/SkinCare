const express = require('express');
const router = express.Router();
const ReviewController = require('../controllers/ReviewController');
const { createReview, updateReview } = require('../validators/reviewValidator');

router.post('/', createReview, ReviewController.createReview);
router.get('/', ReviewController.getAllReviews);
router.get('/:review_id', ReviewController.getReviewById);
router.put('/:review_id', updateReview, ReviewController.updateReview);
router.delete('/:review_id', ReviewController.deleteReview);

module.exports = router;
