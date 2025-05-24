const AppointmentRepository = require('../repositories/AppointmentRepository');

class AppointmentService {
  /**
   * Creates a new appointment.
   * 
   * @param {Object} appointmentData - The data of the appointment to create.
   * @returns {Promise<Object>} - The created appointment instance.
   * @throws {Error} - Throws an error if appointment creation fails.
   */
  async createAppointment(appointmentData) {
    try {
      return await AppointmentRepository.createAppointment(appointmentData);
    } catch (error) {
      throw new Error(`Failed to create appointment: ${error.message}`);
    }
  }  

  /**
   * Retrieves all appointments.
   * 
   * @returns {Promise<Array>} - An array of all appointments.
   * @throws {Error} - Throws an error if retrieving appointments fails.
   */
  async getAllAppointments() {
    try {
      return await AppointmentRepository.getAllAppointments();
    } catch (error) {
      throw new Error(`Failed to retrieve appointments: ${error.message}`);
    }
  }

  /**
   * Retrieves an appointment by its unique ID.
   * 
   * @param {number} appointment_id - The unique identifier of the appointment.
   * @returns {Promise<Object|null>} - The appointment instance if found, or null if not found.
   * @throws {Error} - Throws an error if retrieving the appointment fails.
   */
  async getAppointmentById(appointment_id) {
    try {
      return await AppointmentRepository.getAppointmentById(appointment_id);
    } catch (error) {
      throw new Error(`Failed to retrieve appointment: ${error.message}`);
    }
  }

  async getAppointmentsByUser(userId) {
    try {
      return await AppointmentRepository.getAppointmentsByUser(userId);
    } catch (error) {
      throw new Error(`Failed to get appointments by user: ${error.message}`);
    }
  }
  /**
   * Updates an existing appointment by its ID.
   * 
   * @param {number} appointment_id - The unique identifier of the appointment to update.
   * @param {Object} updateData - The fields to update in the appointment record.
   * @returns {Promise<Object|null>} - The updated appointment instance if successful, or null if the appointment wasn't found.
   * @throws {Error} - Throws an error if updating the appointment fails.
   */
  async updateAppointment(appointment_id, updateData) {
    try {
      const updated = await AppointmentRepository.updateAppointment(appointment_id, updateData);
      if (!updated) {
        throw new Error('Appointment not found');
      }
      return updated;
    } catch (error) {
      throw new Error(`Failed to update appointment: ${error.message}`);
    }
  }

  /**
   * Deletes an appointment by its ID.
   * 
   * @param {number} appointment_id - The unique identifier of the appointment to delete.
   * @returns {Promise<Object>} - A success message if the appointment is deleted, or an error message if not found.
   * @throws {Error} - Throws an error if deleting the appointment fails.
   */
  async deleteAppointment(appointment_id) {
    try {
      const result = await AppointmentRepository.deleteAppointment(appointment_id);
      if (!result) {
        throw new Error('Appointment not found');
      }
      return result;
    } catch (error) {
      throw new Error(`Failed to delete appointment: ${error.message}`);
    }
  }
}

module.exports = new AppointmentService();
