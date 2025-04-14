const ServiceService = require('../services/ServiceService');

class ServiceController {

  /**
   * Create a new service.
   * @param {Object} req - Express request object containing service data in req.body.
   * @param {Object} res - Express response object.
   * @returns {Object} The created service.
   */
  async createService(req, res) {
    try {
      const service = await ServiceService.createService(req.body);
      return res.status(201).json(service);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  /**
   * Get all services.
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   * @returns {Array} List of all services.
   */
  async getAllServices(req, res) {
    try {
      const services = await ServiceService.getAllServices();
      return res.status(200).json(services);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  /**
   * Get a service by ID.
   * @param {Object} req - Express request object with service_id in req.params.
   * @param {Object} res - Express response object.
   * @returns {Object} The service data or 404 if not found.
   */
  async getServiceById(req, res) {
    try {
      const { service_id } = req.params;
      const service = await ServiceService.getServiceById(service_id);
      if (!service) return res.status(404).json({ message: 'Service not found' });
      return res.status(200).json(service);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  /**
   * Retrieves a service by its name.
   * 
   * @param {Object} req - Express request object with `service_name` in `req.params`.
   * @param {Object} res - Express response object.
   * @returns {Object} The service data if found, or a 404 error if not found.
   */
  async getServiceByName(req, res) {
    try {
      const { service_name } = req.params;
      const service = await ServiceService.getServiceByName(service_name);
      if (!service) return res.status(404).json({ message: 'Service not found' });
      return res.status(200).json(service);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  
  /**
   * Update a service by ID.
   * @param {Object} req - Express request object with service_id in req.params and update data in req.body.
   * @param {Object} res - Express response object.
   * @returns {Object} The updated service.
   */
  async updateService(req, res) {
    try {
      const { service_id } = req.params;
      const service = await ServiceService.updateService(service_id, req.body);
      return res.status(200).json(service);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  /**
   * Delete a service by ID.
   * @param {Object} req - Express request object with service_id in req.params.
   * @param {Object} res - Express response object.
   * @returns {Object} The result of the delete operation.
   */
  async deleteService(req, res) {
    try {
      const { service_id } = req.params;
      const result = await ServiceService.deleteService(service_id);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new ServiceController();