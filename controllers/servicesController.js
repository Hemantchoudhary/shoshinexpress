const { service , booking } = require('../models');
const Joi = require('joi');

const bookingSchema = Joi.object({
  services_id: Joi.number().required(),
  service_name: Joi.string().required(),
  booking_name: Joi.string().required(),
  created_by :Joi.string().required()
});


const servicesController = {
    getAllServices: async (req, res) => {
        try {
            const servicesData = await service.getAllService();
            return res.status(200).json({ status: 200, data: servicesData });
        } catch (error) {
            return res.status(500).json({ error: 'Something went wrong !' });
        }
    },

    getService: async (req, res) => {
        try {
            let id = req.params.id;
            const servicesData = await service.getService(id);
            return res.status(200).json({ status: 200, data: servicesData });
        } catch (error) {
            return res.status(500).json({ error: 'Something went wrong !' });
        }
    },

    saveBooking :async(req, res) => {
        try {
            const { error, value } = bookingSchema.validate(req.body);

            if (error) {
            return res.status(400).json({ error: error.details[0].message });
             }
            let bookingInfo = req.body;
            await booking.saveBooking(bookingInfo);
            return res.status(200).json({ status: 200, message: "Booking created Succesfuly" });
        } catch (error) {
            return res.status(500).json({ error: 'Something went wrong !' });
        }
    },




};

module.exports = servicesController;