const UserService = require('../services/UserService');

class UserController {

  /**
   * Create a new user.
   * @param {Object} req - Express request object containing user data in req.body.
   * @param {Object} res - Express response object.
   * @returns {Object} The created user.
   */
  async createUser(req, res) {
    try {
      const user = await UserService.createUser(req.body);
      return res.status(201).json(user);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  /**
   * Get all users.
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   * @returns {Array} List of all users.
   */
  async getAllUsers(req, res) {
    try {
      const users = await UserService.getAllUsers();
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  /**
  * Get a user by ID.
  * @param {Object} req - Express request object with user_id in req.params.
  * @param {Object} res - Express response object.
  * @returns {Object} The user data or 404 if not found.
  */
  async getUserById(req, res) {
    try {
      const { user_id } = req.params;
      const user = await UserService.getUserById(user_id);
      if (!user) return res.status(404).json({ message: 'User not found' });
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  /**
 * Get a user by their username.
 * 
 * @param {Object} req - Express request object with `user_name` in req.params.
 * @param {Object} res - Express response object.
 * @returns {Object} - The user data or a 404 error if not found.
 */
  async getUserByName(req, res) {
    try {
      const { user_name } = req.params;
      const user = await UserService.getUserByName(user_name);
      if (!user) return res.status(404).json({ message: 'User not found' });
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  
  /**
 * Get a user by their email address.
 * 
 * @param {Object} req - Express request object with `user_email` in req.params.
 * @param {Object} res - Express response object.
 * @returns {Object} - The user data or a 404 error if not found.
 */
  async getUserByEmail(req, res) {
    try {
      const { user_email } = req.params;
      const user = await UserService.getUserByEmail(user_email);
      if (!user) return res.status(404).json({ message: 'User not found' });
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  /**
   * Update a user by ID.
   * @param {Object} req - Express request object with user_id in req.params and update data in req.body.
   * @param {Object} res - Express response object.
   * @returns {Object} The updated user.
   */
  async updateUser(req, res) {
    try {
      const { user_id } = req.params;
      const user = await UserService.updateUser(user_id, req.body);
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  /**
   * Delete a user by ID.
   * @param {Object} req - Express request object with user_id in req.params.
   * @param {Object} res - Express response object.
   * @returns {Object} The result of the delete operation.
   */
  async deleteUser(req, res) {
    try {
      const { user_id } = req.params;
      const result = await UserService.deleteUser(user_id);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new UserController();
