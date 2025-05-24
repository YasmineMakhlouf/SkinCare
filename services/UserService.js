const UserRepository = require('../repositories/UserRepository');
const bcrypt = require('bcrypt');
const User = require('../models/User'); 

class UserService {
  /**
   * Creates a new user record.
   * 
   * @param {Object} userData - The data for the user to be created.
   * @returns {Promise<Object>} - The created user instance.
   * @throws {Error} - Throws an error if user creation fails.
   */
  async createUser(userData) {
    try {
      const emailExists = await User.findOne({ where: { user_email: userData.user_email } });
      if (emailExists) {
        throw new Error('This email is already registered.');
      }
  
      const usernameExists = await User.findOne({ where: { user_name: userData.user_name } });
      if (usernameExists) {
        throw new Error('This username is already taken.');
      }
  
      const hashedPassword = await bcrypt.hash(userData.user_password, 10);
      userData.user_password = hashedPassword;
  
      const newUser = await UserRepository.createUser(userData);
      return newUser;
  
    } catch (error) {
      throw new Error(error.message);
    }
  }
  

  /**
   * Retrieves all user records.
   * 
   * @returns {Promise<Array>} - An array of all users.
   * @throws {Error} - Throws an error if retrieving users fails.
   */
  async getAllUsers() {
    try {
      return await UserRepository.getAllUsers();
    } catch (error) {
      throw new Error(`Failed to retrieve users: ${error.message}`);
    }
  }

  /**
   * Retrieves a user by their unique ID.
   * 
   * @param {number} user_id - The unique identifier of the user.
   * @returns {Promise<Object|null>} - The user instance if found, or null if not found.
   * @throws {Error} - Throws an error if retrieving the user fails.
   */
  async getUserById(user_id) {
    try {
      const user = await UserRepository.getUserById(user_id);
      return user;
    } catch (error) {
      throw new Error(`Failed to retrieve user: ${error.message}`);
    }
  }

  /**
   * Retrieves a user by their username.
   * 
   * @param {string} user_name - The username of the user to retrieve.
   * @returns {Promise<Object|null>} - The user instance if found, otherwise null.
   * @throws {Error} - Throws an error if retrieval fails.
   */
  async getUserByName(user_name) {
    try {
      return await UserRepository.getUserByName(user_name);
    } catch (error) {
      throw new Error(`Failed to retrieve user by name: ${error.message}`);
    }
  }

  /**
   * Retrieves a user by their email address.
   * 
   * @param {string} user_email - The email of the user to retrieve.
   * @returns {Promise<Object|null>} - The user instance if found, otherwise null.
   * @throws {Error} - Throws an error if retrieval fails.
   */
  async getUserByEmail(user_email) {
    try {
      return await UserRepository.getUserByEmail(user_email);
    } catch (error) {
      throw new Error(`Failed to retrieve user by email: ${error.message}`);
    }
  }
  
  /**
   * Updates an existing user record by their ID.
   * 
   * @param {number} user_id - The unique identifier of the user to update.
   * @param {Object} updateData - The fields to update in the user record.
   * @returns {Promise<Object|null>} - The updated user instance if successful, or null if the user wasn't found.
   * @throws {Error} - Throws an error if updating the user fails.
   */
  async updateUser(user_id, updateData) {
    try {
      const updatedUser = await UserRepository.updateUser(user_id, updateData);
      if (!updatedUser) {
        throw new Error('User not found');
      }
      return updatedUser;
    } catch (error) {
      throw new Error(`Failed to update user: ${error.message}`);
    }
  }

  /**
   * Deletes a user record by their ID.
   * 
   * @param {number} user_id - The unique identifier of the user to delete.
   * @returns {Promise<Object>} - A success message if the user is deleted, or an error message if not found.
   * @throws {Error} - Throws an error if deleting the user fails.
   */
  async deleteUser(user_id) {
    try {
      const result = await UserRepository.deleteUser(user_id);
      if (!result) {
        throw new Error('User not found');
      }
      return result;
    } catch (error) {
      throw new Error(`Failed to delete user: ${error.message}`);
    }
  }

  /**
   * Find a user by username or email.
   * @param {string} usernameOrEmail - The username or email to search.
   * @returns {Object|null} - The user if found, else null.
   */
  async findUserByEmail(email) {
    try {
      return await UserRepository.findUserByEmail(email);
    } catch (error) {
      throw new Error(`UserService - findUserByEmail: ${error.message}`);
    }
  }
}

module.exports = new UserService();
