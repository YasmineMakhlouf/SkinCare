const AppointmentService = require('../services/AppointmentService');
const ServiceService = require('../services/ServiceService');

class AppointmentController {

  /**
   * Create a new appointment.
   * @param {Object} req - Express request object containing appointment data in req.body.
   * @param {Object} res - Express response object.
   * @returns {Object} The created appointment.
   */
  async createAppointment(req, res) {
    try {
      if (!req.session.user_id) return res.redirect('/login');

      const appointmentData = {
        ...req.body,
        user_id: req.session.user_id
      };

      console.log(req.body);
      await AppointmentService.createAppointment(appointmentData);
      return res.redirect('/appointments');
    } catch (error) {
      return res.status(500).render('error', { error: error.message });
    }
  }


  /**
 * Get all appointments.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Array} List of all appointments.
 */
  async getAllAppointments(req, res) {
    try {
      const appointments = await AppointmentService.getAllAppointments();
      return res.render('appointments', { appointments });
    } catch (error) {
      return res.render('error', { error: error.message });
    }
  }

  /**
   * Get an appointment by ID.
   * @param {Object} req - Express request object with appointment_id in req.params.
   * @param {Object} res - Express response object.
   * @returns {Object} The appointment data or 404 if not found.
   */
  async getAppointmentById(req, res) {
    try {
      const { appointment_id } = req.params;
      const appointment = await AppointmentService.getAppointmentById(appointment_id);
      if (!appointment) return res.render('notfound', { message: 'Appointment not found' });
      return res.render('appointmentDetails', { appointment });
    } catch (error) {
      return res.render('error', { error: error.message });
    }
  }

  /**
   * Update an appointment by ID.
   * @param {Object} req - Express request object with appointment_id in req.params and update data in req.body.
   * @param {Object} res - Express response object.
   * @returns {Object} The updated appointment.
   */
  async updateAppointment(req, res) {
    try {
      const { appointment_id } = req.params;
      const appointment = await AppointmentService.updateAppointment(appointment_id, req.body);
      return res.render('appointmentUpdated', { appointment });
    } catch (error) {
      return res.render('error', { error: error.message });
    }
  }

  /**
   * Delete an appointment by ID.
   * @param {Object} req - Express request object with appointment_id in req.params.
   * @param {Object} res - Express response object.
   * @returns {Object} The result of the delete operation.
   */
  async deleteAppointment(req, res) {
    try {
      const { appointment_id } = req.params;
      const result = await AppointmentService.deleteAppointment(appointment_id);
      return res.render('appointmentDeleted', { result });
    } catch (error) {
      return res.render('error', { error: error.message });
    }
  }

  /**
   * Render the appointment page with services and user appointments.
   * @param {Object} req 
   * @param {Object} res 
   */

  async renderAppointmentPage(req, res) {
    try {
      if (!req.session.user_id) {
        return res.render('bookAppointment', {
          userId: null,
          services: [],
          appointments: []
        });
      }

      const services = await ServiceService.getAllServices();
      const appointments = await AppointmentService.getAppointmentsByUser(req.session.user_id);

      res.render('bookAppointment', {
        userId: req.session.user_id,
        services,
        appointments
      });
    } catch (error) {
      res.status(500).render('error', { error: error.message });
    }
  }
}

module.exports = new AppointmentController();
