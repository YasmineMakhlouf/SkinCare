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
      return res.redirect('/services');
    } catch (error) {
      return res.status(500).render('error', { error: error.message });
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
 * Render service details page by ID.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
  async getServiceById(req, res) {
    try {
      const { service_id } = req.params;
      const service = await ServiceService.getServiceById(service_id);
      if (!service) return res.status(404).render('notFound', { message: 'Service not found' });
      return res.render('serviceDetails', { service });
    } catch (error) {
      return res.status(500).render('error', { error: error.message });
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
      if (!service) return res.status(404).render('notFound', { message: 'Service not found' });
      return res.render('serviceDetails', { service });
    } catch (error) {
      return res.status(500).render('error', { error: error.message });
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
      await ServiceService.updateService(service_id, req.body);
      return res.redirect('/services');
    } catch (error) {
      return res.status(500).render('error', { error: error.message });
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
      await ServiceService.deleteService(service_id);
      return res.redirect('/services');
    } catch (error) {
      return res.status(500).render('error', { error: error.message });
    }
  }
  /**
   * Handles request to filter services by price (>, <).
   * @param {Object} req - Express request object with `price` and `operator` in query
   * @param {Object} res - Express response object
   * @returns JSON response with matching services or error
   */
  async getServiceByPrice(req, res) {
    try {
      const { price, operator } = req.params;

      if (!price || isNaN(parseFloat(price))) {
        return res.status(400).render('error', { error: 'A valid "price" number is required.' });
      }

      if (!['>', '<'].includes(operator)) {
        return res.status(400).render('error', { error: 'Operator must be ">" or "<"' });
      }

      const services = await ServiceService.getServicesByPrice(operator, parseFloat(price));
      return res.render('filteredServices', { services, price, operator });
    } catch (error) {
      return res.status(500).render('error', { error: error.message });
    }
  }

  async renderServicesPage(req, res) {
    try {
      const services = await ServiceService.getAllServices();
      return res.render('services', { services });
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }

}

module.exports = new ServiceController();