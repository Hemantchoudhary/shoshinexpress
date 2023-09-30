const { DataTypes, where } = require('sequelize');

module.exports = sequelize => {
  const Booking = sequelize.define('booking', {
    services_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    service_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    booking_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    created_by: {
      type: DataTypes.STRING,
      allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE, 
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        type: DataTypes.DATE, 
        allowNull: false,
        defaultValue: DataTypes.NOW
      }
  });


  Booking.saveBooking = async function (bookingInfo) {
    try {
      return await Booking.create(bookingInfo);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Something went wrong" });
    }
};



  return Booking;
};