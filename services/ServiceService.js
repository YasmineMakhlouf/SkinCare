const ServiceRepository = require('../repositories/ServiceRepository');

class ServiceService {
  /**
   * Creates a new service record.
   * 
   * @param {Object} serviceData - The data of the service to create.
   * @returns {Promise<Object>} - The created service instance.
   * @throws {Error} - Throws an error if service creation fails.
   */
  async createService(serviceData) {
    try {
      return await ServiceRepository.createService(serviceData);
    } catch (error) {
      throw new Error(`Failed to create service: ${error.message}`);
    }
  }

  /**
   * Retrieves all service records.
   * 
   * @returns {Promise<Array>} - An array of all services.
   * @throws {Error} - Throws an error if retrieving services fails.
   */
  async getAllServices() {
    try {
      return await ServiceRepository.getAllServices();
    } catch (error) {
      throw new Error(`Failed to retrieve services: ${error.message}`);
    }
  }

  /**
   * Retrieves a service by its unique ID.
   * 
   * @param {number} service_id - The unique identifier of the service.
   * @returns {Promise<Object|null>} - The service instance if found, or null if not found.
   * @throws {Error} - Throws an error if retrieving the service fails.
   */
  async getServiceById(service_id) {
    try {
      const service = await ServiceRepository.getServiceById(service_id);
      return service;
    } catch (error) {
      throw new Error(`Failed to retrieve service: ${error.message}`);
    }
  }

  /**
 * Retrieves a service by its name.
 * 
 * @param {string} service_name - The name of the service to retrieve.
 * @returns {Promise<Object|null>} - The service instance if found, otherwise null.
 * @throws {Error} - Throws an error if retrieval fails.
 */
  async getServiceByName(service_name) {
    try {
      return await ServiceRepository.getServiceByName(service_name);
    } catch (error) {
      throw new Error(`Failed to retrieve service by name: ${error.message}`);
    }
  }
  

  /**
   * Updates an existing service record by its ID.
   * 
   * @param {number} service_id - The unique identifier of the service to update.
   * @param {Object} updateData - The fields to update in the service record.
   * @returns {Promise<Object|null>} - The updated service instance if successful, or null if the service wasn't found.
   * @throws {Error} - Throws an error if updating the service fails.
   */
  async updateService(service_id, updateData) {
    try {
      const updatedService = await ServiceRepository.updateService(service_id, updateData);
      if (!updatedService) {
        throw new Error('Service not found');
      }
      return updatedService;
    } catch (error) {
      throw new Error(`Failed to update service: ${error.message}`);
    }
  }

  /**
   * Deletes a service record by its ID.
   * 
   * @param {number} service_id - The unique identifier of the service to delete.
   * @returns {Promise<Object>} - A success message if the service is deleted, or an error message if not found.
   * @throws {Error} - Throws an error if deleting the service fails.
   */
  async deleteService(service_id) {
    try {
      const result = await ServiceRepository.deleteService(service_id);
      if (!result) {
        throw new Error('Service not found');
      }
      return result;
    } catch (error) {
      throw new Error(`Failed to delete service: ${error.message}`);
    }
  }
}

module.exports = new ServiceService();
