const UserService = require('../services/UserService');
const bcrypt = require('bcrypt');
const session = require('express-session');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../public/uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `user-${req.session.user_id}-${Date.now()}${ext}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const ext = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mime = allowedTypes.test(file.mimetype);
    if (ext && mime) {
      cb(null, true);
    } else {
      cb(new Error('Only images are allowed'));
    }
  }
}).single('profileImage');

function uploadMiddleware(req, res) {
  return new Promise((resolve, reject) => {
    upload(req, res, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}

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
      req.session.user = {
        id: user.user_id,
        name: user.user_name,
        email: user.user_email,
      };
      return res.redirect('/home');
    } catch (error) {
      return res.status(422).render('register', { errorMessage: error.message });
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
      return res.render('manageUsers', { users });
    } catch (error) {
      return res.status(500).render('error', { errorMessage: error.message });
    }
  }

  /**
  * Get a user by ID.
  * @param {Object} req - Express request object with user_id in req.params.
  * @param {Object} res - Express response object.
  * @returns {Rendered page} The user data or error page.
  */
  async getUserById(req, res) {
    try {
      const { user_id } = req.params;
      const user = await UserService.getUserById(user_id);
      if (!user) {
        return res.status(404).render('error', { errorMessage: 'User not found' });
      }
      return res.render('userDetail', { user });
    } catch (error) {
      return res.status(500).render('error', { errorMessage: error.message });
    }
  }

  /**
   * Get a user by their username.
   * 
   * @param {Object} req - Express request object with `user_name` in req.params.
   * @param {Object} res - Express response object.
   * @returns {Rendered page} The user data or error page.
   */
  async getUserByName(req, res) {
    try {
      const { user_name } = req.params;
      const user = await UserService.getUserByName(user_name);
      if (!user) {
        return res.status(404).render('error', { errorMessage: 'User not found' });
      }
      return res.render('userDetail', { user });
    } catch (error) {
      return res.status(500).render('error', { errorMessage: error.message });
    }
  }

  /**
   * Get a user by their email address.
   * 
   * @param {Object} req - Express request object with `user_email` in req.params.
   * @param {Object} res - Express response object.
   * @returns {Rendered page} The user data or error page.
   */
  async getUserByEmail(req, res) {
    try {
      const { user_email } = req.params;
      const user = await UserService.getUserByEmail(user_email);
      if (!user) {
        return res.status(404).render('error', { errorMessage: 'User not found' });
      }
      return res.render('userDetail', { user });
    } catch (error) {
      return res.status(500).render('error', { errorMessage: error.message });
    }
  }

  /**
   * Update a user by ID.
   * @param {Object} req - Express request object with user_id in req.params and update data in req.body.
   * @param {Object} res - Express response object.
   * @returns {Rendered page} The updated user or error page.
   */
  async updateUser(req, res) {
    try {
      const { user_id } = req.params;
      const user = await UserService.updateUser(user_id, req.body);
      return res.render('userDetail', { user });
    } catch (error) {
      return res.status(500).render('error', { errorMessage: error.message });
    }
  }

  /**
   * Delete a user by ID.
   * @param {Object} req - Express request object with user_id in req.params.
   * @param {Object} res - Express response object.
   * @returns {Rendered page} Confirmation or error page.
   */
  async deleteUser(req, res) {
    try {
      const { user_id } = req.params;
      const result = await UserService.deleteUser(user_id);
      return res.render('deleteConfirmation', { result });
    } catch (error) {
      return res.status(500).render('error', { errorMessage: error.message });
    }
  }

  /**
   * Handles user login.
   * @param {Object} req - The Express request object.
   * @param {Object} res - The Express response object.
   * @returns {Object} - The login result message.
   */
  async loginUser(req, res) {
    try {
      const { user_email, user_password } = req.body;

      if (!user_email) {
        return res.status(400).render('login', { errorMessage: 'Email is required' });
      }

      const user = await UserService.findUserByEmail(user_email);

      if (!user) {
        return res.status(404).render('login', { errorMessage: 'User not found' });
      }

      console.log("Input Password:", user_password);
      console.log("Stored Hash:", user.user_password);

      const isPasswordValid = await bcrypt.compare(user_password, user.user_password);
      console.log('Password Match:', isPasswordValid);

      if (!isPasswordValid) {
        return res.status(401).render('login', { errorMessage: 'Invalid password' });
      }

      req.session.user_id = user.user_id;
      req.session.user_name = user.user_name;

      return res.redirect('/home');
    } catch (error) {
      console.error('Login error:', error);
      return res.status(500).render('login', { errorMessage: 'Something went wrong during login' });
    }
  }

  async logout(req, res) {
    try {
      req.session.destroy(err => {
        if (err) {
          return res.status(500).json({ error: 'Logout failed' });
        }
        res.clearCookie('connect.sid');
        return res.redirect('/');
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  async getProfilePage(req, res) {
    try {
      const userId = req.session.user_id;
      if (!userId) {
        return res.redirect('/login');
      }
      const user = await UserService.getUserById(userId);
      if (!user) return res.redirect('/login');
      return res.render('profile', { user, errorMessage: null });
    } catch (error) {
      return res.status(500).send('Server error');
    }
  }

  async uploadProfileImage(req, res) {
    try {
      await uploadMiddleware(req, res);

      if (!req.file) {
        const user = await UserService.getUserById(req.session.user_id);
        return res.render('profile', { user, errorMessage: 'Please select an image file' });
      }

      const imagePath = `/uploads/${req.file.filename}`;
      await UserService.updateUser(req.session.user_id, { user_image: imagePath });
      return res.redirect('/profile');

    } catch (error) {
      try {
        const user = await UserService.getUserById(req.session.user_id);
        return res.render('profile', { user, errorMessage: error.message || 'Failed to upload image' });
      } catch {
        return res.status(500).send('Server error');
      }
    }
  }

}

module.exports = new UserController();
