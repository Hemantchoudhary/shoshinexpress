const express = require('express');
const router = express.Router();
const serviceController =  require('../controllers/servicesController');

// console.log("hemnat>>>>>>>>>>>>>>>")
router.get('/list', serviceController.getAllServices);

module.exports = router;

