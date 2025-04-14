const express = require('express');
const router = express.Router();
const ServiceController = require('../controllers/ServiceController');
const { createService, updateService } = require('../validators/serviceValidator');

router.post('/', createService, ServiceController.createService);
router.get('/', ServiceController.getAllServices);
router.get('/:service_id', ServiceController.getServiceById);
router.get('/by-name/:service_name', ServiceController.getServiceByName);
router.put('/:service_id', updateService, ServiceController.updateService);
router.delete('/:service_id', ServiceController.deleteService);

module.exports = router;
