const User = require('../models/User');

class UserRepository {
  /**
   * Creates a new user in the database with the provided user data.
   * 
   * @param {Object} userData - The data of the user to create.
   * @returns {Promise<Object>} - The created user instance.
   */
  async createUser(userData) {
    return await User.create(userData);
  }

  /**
   * Retrieves all users from the database.
   * 
   * @returns {Promise<Array>} - An array of all user instances in the database.
   */
  async getAllUsers() {
    return await User.findAll();
  }

  /**
   * Retrieves a user by their unique ID.
   * 
   * @param {number} user_id - The unique identifier of the user.
   * @returns {Promise<Object|null>} - The user instance if found, or null if no user with the given ID exists.
   */
  async getUserById(user_id) {
    return await User.findByPk(user_id);
  }

  /**
 * Retrieve a user by their username.
 * 
 * @param {string} user_name - The username of the user to retrieve.
 * @returns {Promise<Object|null>} - The user instance if found, otherwise null.
 */
  async getUserByName(user_name) {
    return await User.findOne({ where: { user_name } });
  }

  /**
 * Retrieve a user by their email address.
 * 
 * @param {string} user_email - The email address of the user to retrieve.
 * @returns {Promise<Object|null>} - The user instance if found, otherwise null.
 */
  async getUserByEmail(user_email) {
    return await User.findOne({ where: { user_email } });
  }

  /**
   * Updates an existing user in the database using the provided data.
   * 
   * @param {number} user_id - The unique identifier of the user to update.
   * @param {Object} updateData - The fields to update in the user record.
   * @returns {Promise<Object|null>} - The updated user instance if the user is found, or null if no user is found with the given ID.
   */
  async updateUser(user_id, updateData) {
    const user = await User.findByPk(user_id);
    if (!user) return null;
    await user.update(updateData);
    return user;
  }

  /**
   * Deletes a user from the database by their unique ID.
   * 
   * @param {number} user_id - The unique identifier of the user to delete.
   * @returns {Promise<Object|null>} - A message indicating success if the user was deleted, or null if no user was found with the given ID.
   */
  async deleteUser(user_id) {
    const user = await User.findByPk(user_id);
    if (!user) return null;
    await user.destroy();
    return { message: 'User deleted successfully' };
  }

  /**
   * Find a user by username or email.
   * @param {string} usernameOrEmail - The username or email to search.
   * @returns {Object|null} - The user if found, else null.
   */
  async findUserByEmail(email) {
    try {
      const user = await User.findOne({
        where: { user_email: email }
      });
      return user;
    } catch (error) {
      throw new Error(`Database error while finding user by email: ${error.message}`);
    }
  }
  
}

module.exports = new UserRepository();
