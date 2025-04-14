const express = require('express');
const router = express.Router();
const AppointmentController = require('../controllers/AppointmentController');
const { createAppointment, updateAppointment } = require('../validators/appointmentValidator');

router.post('/', createAppointment, AppointmentController.createAppointment);
router.get('/', AppointmentController.getAllAppointments);
router.get('/:appointment_id', AppointmentController.getAppointmentById);
router.put('/:appointment_id', updateAppointment, AppointmentController.updateAppointment);
router.delete('/:appointment_id', AppointmentController.deleteAppointment);

module.exports = router;
