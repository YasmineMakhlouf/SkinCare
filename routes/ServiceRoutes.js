const express = require('express');
const router = express.Router();
const { ensureAdmin } = require('../middleware/adminMiddleware');
const ServiceController = require('../controllers/ServiceController');
const { createService, updateService } = require('../validators/serviceValidator');

router.get('/api/services', ServiceController.getAllServices);
router.get('/', ServiceController.renderServicesPage);

router.post('/', createService, ensureAdmin, ServiceController.createService);
router.get('/', ensureAdmin, ServiceController.getAllServices);
router.get('/:service_id', ensureAdmin, ServiceController.getServiceById);
router.get('/by-name/:service_name', ensureAdmin, ServiceController.getServiceByName);
router.put('/:service_id', updateService, ensureAdmin, ServiceController.updateService);
router.delete('/:service_id', ensureAdmin, ServiceController.deleteService);
router.get('/price/:price/:operator', ensureAdmin, ServiceController.getServiceByPrice);

module.exports = router;
