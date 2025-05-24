const Appointment = require('../models/Appointment');
const Service = require('../models/Service');

class AppointmentRepository {
    /**
   * Create a new appointment record in the database.
   * @param {Object} appointmentData - Data to create the appointment.
   * @returns {Promise<Object>} The created appointment instance.
   */
  async createAppointment(appointmentData) {
    return await Appointment.create(appointmentData);
  }

  /**
   * Retrieve all appointment records from the database.
   * @returns {Promise<Array>} A list of all appointment instances.
   */
  async getAllAppointments() {
    return await Appointment.findAll();
  }

  /**
   * Retrieve a specific appointment by its ID.
   * @param {number} appointment_id - ID of the appointment to retrieve.
   * @returns {Promise<Object|null>} The appointment instance or null if not found.
   */
  async getAppointmentById(appointment_id) {
    return await Appointment.findByPk(appointment_id);
  }

  async getAppointmentsByUser(userId) {
    return await Appointment.findAll({
      where: { user_id: userId },
      include: [{ model: Service, attributes: ['service_name'] }]
    });
  }

  /**
   * Update a specific appointment by its ID.
   * @param {number} appointment_id - ID of the appointment to update.
   * @param {Object} updateData - Data to update the appointment.
   * @returns {Promise<Object|null>} The updated appointment or null if not found.
   */
  async updateAppointment(appointment_id, updateData) {
    const appointment = await Appointment.findByPk(appointment_id);
    if (!appointment) return null;
    await appointment.update(updateData);
    return appointment;
  }

  /**
   * Delete a specific appointment by its ID.
   * @param {number} appointment_id - ID of the appointment to delete.
   * @returns {Promise<Object|null>} A message object if deleted, or null if not found.
   */
  async deleteAppointment(appointment_id) {
    const appointment = await Appointment.findByPk(appointment_id);
    if (!appointment) return null;
    await appointment.destroy();
    return { message: 'Appointment deleted successfully' };
  }
}

module.exports = new AppointmentRepository();
