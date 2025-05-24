module.exports = {
    ensureAdmin(req, res, next) {
      const userId = req.session.user_id;
  
      if (!userId || userId !== 5) {
        return res.status(403).render('error', {
          error: 'Access denied. Admin only.',
        });
      }
  
      next();
    }
  };


/*admin:
gmail:amani@example.com
password: mypassword123
*/