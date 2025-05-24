const express = require('express');
const router = express.Router();
const { ensureAdmin } = require('../middleware/adminMiddleware');
const AppointmentController = require('../controllers/AppointmentController');
const { createAppointment, updateAppointment } = require('../validators/appointmentValidator');

function mapAppointmentFields(req, res, next) {
    const userId = req.session.user_id;
    if (!userId) {
      return res.status(401).json({ errors: [{ msg: "User not logged in", location: "session" }] });
    }
  
    req.body.appointment_date = req.body.date;
  
    req.body.user_id = userId;

    if (!req.body.service_id || req.body.service_id.trim() === '') {
      return res.status(400).json({
        errors: [{ msg: "Service ID is required", path: "service_id", location: "body" }]
      });
    }
  
    const parsed = parseInt(req.body.service_id, 10);
    if (isNaN(parsed)) {
      return res.status(400).json({
        errors: [{ msg: "Service ID must be an integer", path: "service_id", location: "body" }]
      });
    }
  
    req.body.service_id = parsed;
    next();
  }
  
router.get('/', AppointmentController.renderAppointmentPage);
router.post('/', mapAppointmentFields, createAppointment, AppointmentController.createAppointment);
router.get('/all', ensureAdmin, AppointmentController.getAllAppointments);
router.get('/:appointment_id', ensureAdmin, AppointmentController.getAppointmentById);
router.put('/:appointment_id', updateAppointment, AppointmentController.updateAppointment);
router.delete('/:appointment_id', AppointmentController.deleteAppointment);

module.exports = router;
