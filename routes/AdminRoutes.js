const express = require('express');
const router = express.Router();
const { ensureAdmin } = require('../middleware/adminMiddleware');

router.get('/dashboard', ensureAdmin, (req, res) => {
  res.render('admin/dashboard', {
    user: {
      name: req.session.user_name,
    },
  });
});

module.exports = router;
