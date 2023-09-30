    const express = require('express');
    const router = express.Router();
    const { body } = require('express-validator');

    // const userController = require('../controllers/userController');
    const verifyToken = require('./middlewares/jwtMiddleware'); 
    const managerController = require('../controllers/managerController');
    const employeeController = require('../controllers/employeeController');
    const organisationController = require('../controllers/organisationController');

    /// service And booking Routes
    const servicesController = require('../controllers/servicesController');

    // const bookingValidationRules = [
    //     body('services_id').notEmpty().withMessage('Service Id is required.'),
    //     body('service_name').notEmpty().withMessage('Service Name is required.'),
    //   ];

    // router.use((req, res, next) => {
    //     if (req.path === '/login') {
    //       return next(); 
    //     }
    //     verifyToken(req, res, next);
    // });

    // router.post('/login', userController.loginUsers);
    router.get('/get/all/employee', employeeController.getAllEmployee);
    router.post('/create/employee', employeeController.createEmployee);

    ///manger routes
    router.get('/get/all/manager', managerController.getAllManagerList);
    router.post('/create/manager', managerController.createManager);
    router.get('/get/all/manager/mapped/employee', managerController.getAllManagerMappedEmployee);

    //organisation Holiday
    // define by organisation
    router.get('/get/orgination/holiday', organisationController.organisationHoliday);


    /// service and booking routes

    router.get('/services', servicesController.getAllServices);
    router.get('/services/:id',servicesController.getService);
    router.post('/bookings',servicesController.saveBooking);




    module.exports = router;
