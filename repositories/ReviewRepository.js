const Review = require('../models/Review');

class ReviewRepository {
  /**
   * Create a new review in the database.
   * @param {Object} reviewData - Data for the new review.
   * @returns {Promise<Object>} The created review instance.
   */
  async createReview(reviewData) {
    return await Review.create(reviewData);
  }

  /**
   * Retrieve all reviews from the database.
   * @returns {Promise<Array>} A list of all review instances.
   */
  async getAllReviews() {
    return await Review.findAll();
  }

  /**
   * Retrieve a specific review by its ID.
   * @param {number} review_id - ID of the review to retrieve.
   * @returns {Promise<Object|null>} The review instance or null if not found.
   */
  async getReviewById(review_id) {
    return await Review.findByPk(review_id);
  }

  /**
   * Update a review by its ID.
   * @param {number} review_id - ID of the review to update.
   * @param {Object} updateData - The new data to update.
   * @returns {Promise<Object|null>} The updated review or null if not found.
   */
  async updateReview(review_id, updateData) {
    const review = await Review.findByPk(review_id);
    if (!review) return null;
    await review.update(updateData);
    return review;
  }

  /**
   * Delete a review by its ID.
   * @param {number} review_id - ID of the review to delete.
   * @returns {Promise<Object|null>} A success message or null if not found.
   */
  async deleteReview(review_id) {
    const review = await Review.findByPk(review_id);
    if (!review) return null;
    await review.destroy();
    return { message: 'Review deleted successfully' };
  }
}

module.exports = new ReviewRepository();
