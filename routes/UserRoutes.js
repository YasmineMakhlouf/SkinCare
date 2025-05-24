const express = require('express');
const router = express.Router();
const { ensureAdmin } = require('../middleware/adminMiddleware');
const UserController = require('../controllers/UserController');
const { createUser, updateUser, loginValidator } = require('../validators/userValidator');

router.get('/logout', UserController.logout);
router.post('/', createUser, UserController.createUser);
router.get('/', ensureAdmin, UserController.getAllUsers);
router.get('/:user_id', ensureAdmin, UserController.getUserById);
router.get('/name/:user_name', ensureAdmin, UserController.getUserByName);
router.get('/email/:user_email', ensureAdmin, UserController.getUserByEmail);
router.post('/users/:user_id', updateUser, UserController.updateUser);
router.delete('/users/:user_id', ensureAdmin, UserController.deleteUser);
router.post('/login', loginValidator, UserController.loginUser);
module.exports = router;
