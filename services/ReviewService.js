const ReviewRepository = require('../repositories/ReviewRepository');

class ReviewService {
  /**
   * Creates a new review record.
   * 
   * @param {Object} reviewData - The data of the review to create.
   * @returns {Promise<Object>} - The created review instance.
   * @throws {Error} - Throws an error if review creation fails.
   */
  async createReview(reviewData) {
    try {
      return await ReviewRepository.createReview(reviewData);
    } catch (error) {
      throw new Error(`Failed to create review: ${error.message}`);
    }
  }

  /**
   * Retrieves all review records.
   * 
   * @returns {Promise<Array>} - An array of all reviews.
   * @throws {Error} - Throws an error if retrieving reviews fails.
   */
  async getAllReviews() {
    try {
      return await ReviewRepository.getAllReviews();
    } catch (error) {
      throw new Error(`Failed to retrieve reviews: ${error.message}`);
    }
  }

  /**
   * Retrieves a review by its unique ID.
   * 
   * @param {number} review_id - The unique identifier of the review.
   * @returns {Promise<Object|null>} - The review instance if found, or null if not found.
   * @throws {Error} - Throws an error if retrieving the review fails.
   */
  async getReviewById(review_id) {
    try {
      const review = await ReviewRepository.getReviewById(review_id);
      return review;
    } catch (error) {
      throw new Error(`Failed to retrieve review: ${error.message}`);
    }
  }

  /**
   * Updates an existing review record by its ID.
   * 
   * @param {number} review_id - The unique identifier of the review to update.
   * @param {Object} updateData - The fields to update in the review record.
   * @returns {Promise<Object|null>} - The updated review instance if successful, or null if the review wasn't found.
   * @throws {Error} - Throws an error if updating the review fails.
   */
  async updateReview(review_id, updateData) {
    try {
      const updatedReview = await ReviewRepository.updateReview(review_id, updateData);
      if (!updatedReview) {
        throw new Error('Review not found');
      }
      return updatedReview;
    } catch (error) {
      throw new Error(`Failed to update review: ${error.message}`);
    }
  }

  /**
   * Deletes a review record by its ID.
   * 
   * @param {number} review_id - The unique identifier of the review to delete.
   * @returns {Promise<Object>} - A success message if the review is deleted, or an error message if not found.
   * @throws {Error} - Throws an error if deleting the review fails.
   */
  async deleteReview(review_id) {
    try {
      const result = await ReviewRepository.deleteReview(review_id);
      if (!result) {
        throw new Error('Review not found');
      }
      return result;
    } catch (error) {
      throw new Error(`Failed to delete review: ${error.message}`);
    }
  }
}

module.exports = new ReviewService();
