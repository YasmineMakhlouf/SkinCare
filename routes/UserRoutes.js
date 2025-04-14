const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const { createUser, updateUser } = require('../validators/userValidator');

router.post('/', createUser, UserController.createUser);
router.get('/', UserController.getAllUsers);
router.get('/:user_id', UserController.getUserById);
router.get('/name/:user_name', UserController.getUserByName);
router.get('/email/:user_email', UserController.getUserByEmail);
router.put('/:user_id', updateUser, UserController.updateUser);
router.delete('/:user_id', UserController.deleteUser);

module.exports = router;
