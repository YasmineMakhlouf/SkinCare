const AppointmentService = require('../services/AppointmentService');

class AppointmentController {

  /**
   * Create a new appointment.
   * @param {Object} req - Express request object containing appointment data in req.body.
   * @param {Object} res - Express response object.
   * @returns {Object} The created appointment.
   */
  async createAppointment(req, res) {
    try {
      const appointment = await AppointmentService.createAppointment(req.body);
      return res.status(201).json(appointment);
    } catch (error) {
      return res.status(500).json({ error: error.message });
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
      return res.status(200).json(appointments);
    } catch (error) {
      return res.status(500).json({ error: error.message });
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
      if (!appointment) return res.status(404).json({ message: 'Appointment not found' });
      return res.status(200).json(appointment);
    } catch (error) {
      return res.status(500).json({ error: error.message });
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
      return res.status(200).json(appointment);
    } catch (error) {
      return res.status(500).json({ error: error.message });
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
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new AppointmentController();
