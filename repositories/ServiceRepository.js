const Service = require('../models/Service');

class ServiceRepository {
  /**
   * Create a new service in the database.
   * @param {Object} serviceData - Data for the new service.
   * @returns {Promise<Object>} The created service instance.
   */
  async createService(serviceData) {
    return await Service.create(serviceData);
  }

  /**
   * Retrieve all services from the database.
   * @returns {Promise<Array>} A list of all service instances.
   */
  async getAllServices() {
    return await Service.findAll();
  }

  /**
   * Retrieve a specific service by its ID.
   * @param {number} service_id - ID of the service to retrieve.
   * @returns {Promise<Object|null>} The service instance or null if not found.
   */
  async getServiceById(service_id) {
    return await Service.findByPk(service_id);
  }

  /**
   * Retrieves a service by its name.
   * 
   * @param {string} service_name - The name of the service to retrieve.
   * @returns {Promise<Object|null>} - The service instance if found, otherwise null.
   */
  async getServiceByName(service_name) {
    return await Service.findOne({ where: { service_name } });
  }

  /**
   * Update a service by its ID.
   * @param {number} service_id - ID of the service to update.
   * @param {Object} updateData - The new data to update.
   * @returns {Promise<Object|null>} The updated service or null if not found.
   */
  async updateService(service_id, updateData) {
    const service = await Service.findByPk(service_id);
    if (!service) return null;
    await service.update(updateData);
    return service;
  }

  /**
   * Delete a service by its ID.
   * @param {number} service_id - ID of the service to delete.
   * @returns {Promise<Object|null>} A success message or null if not found.
   */
  async deleteService(service_id) {
    const service = await Service.findByPk(service_id);
    if (!service) return null;
    await service.destroy();
    return { message: 'Service deleted successfully' };
  }
}

module.exports = new ServiceRepository();
