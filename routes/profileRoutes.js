const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

router.get('/', UserController.getProfilePage.bind(UserController));
router.post('/upload', UserController.uploadProfileImage.bind(UserController));

module.exports = router;
