const ReviewService = require('../services/ReviewService');

/**
   * Create a new review.
   * @param {Object} req - Express request object containing review data in req.body.
   * @param {Object} res - Express response object.
   * @returns {Object} The created review.
   */
class ReviewController {
  async createReview(req, res) {
    try {
      const review = await ReviewService.createReview(req.body);
      return res.status(201).json(review);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  /**
   * Get all reviews.
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   * @returns {Array} List of all reviews.
   */
  async getAllReviews(req, res) {
    try {
      const reviews = await ReviewService.getAllReviews();
      return res.status(200).json(reviews);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  /**
   * Get a review by ID.
   * @param {Object} req - Express request object with review_id in req.params.
   * @param {Object} res - Express response object.
   * @returns {Object} The review data or 404 if not found.
   */
  async getReviewById(req, res) {
    try {
      const { review_id } = req.params;
      const review = await ReviewService.getReviewById(review_id);
      if (!review) return res.status(404).json({ message: 'Review not found' });
      return res.status(200).json(review);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  /**
   * Update a review by ID.
   * @param {Object} req - Express request object with review_id in req.params and update data in req.body.
   * @param {Object} res - Express response object.
   * @returns {Object} The updated review.
   */
  async updateReview(req, res) {
    try {
      const { review_id } = req.params;
      const review = await ReviewService.updateReview(review_id, req.body);
      return res.status(200).json(review);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  /**
   * Delete a review by ID.
   * @param {Object} req - Express request object with review_id in req.params.
   * @param {Object} res - Express response object.
   * @returns {Object} The result of the delete operation.
   */
  async deleteReview(req, res) {
    try {
      const { review_id } = req.params;
      const result = await ReviewService.deleteReview(review_id);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new ReviewController();
