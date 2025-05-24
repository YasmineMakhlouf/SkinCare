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
      return res.redirect('/reviews');
    } catch (error) {
      return res.status(500).render('error', { error: error.message });
    }
  }

  /**
 * Get all reviews and render the review page.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
  async getAllReviews(req, res) {
    try {
      const reviews = await ReviewService.getAllReviews();
      return res.render('review', { reviews });
    } catch (error) {
      return res.status(500).render('error', { error: error.message });
    }
  }

  /**
   * Get a review by ID and render reviewDetails page.
   * @param {Object} req - Express request object with review_id in req.params.
   * @param {Object} res - Express response object.
   * 
   */
  async getReviewById(req, res) {
    try {
      const { review_id } = req.params;
      const review = await ReviewService.getReviewById(review_id);
      if (!review) return res.status(404).render('notFound', { message: 'Review not found' });
      return res.render('reviewDetails', { review });
    } catch (error) {
      return res.status(500).render('error', { error: error.message });
    }
  }

  /**
   * Update a review by ID and redirect to all reviews.
   * @param {Object} req - Express request object with review_id in req.params and update data in req.body.
   * @param {Object} res - Express response object.
   * 
   */
  async updateReview(req, res) {
    try {
      const { review_id } = req.params;
      await ReviewService.updateReview(review_id, req.body);
      return res.redirect('/reviews');
    } catch (error) {
      return res.status(500).render('error', { error: error.message });
    }
  }

  /**
   * Delete a review by ID and redirect to all reviews.
   * @param {Object} req - Express request object with review_id in req.params.
   * @param {Object} res - Express response object.
   * 
   */
  async deleteReview(req, res) {
    try {
      const { review_id } = req.params;
      await ReviewService.deleteReview(review_id);
      return res.redirect('/reviews');
    } catch (error) {
      return res.status(500).render('error', { error: error.message });
    }
  }

}

module.exports = new ReviewController();
