const { DataTypes, where } = require('sequelize');

module.exports = sequelize => {
  const Service = sequelize.define('service', {
    service_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE, // Use DATE for timestamp
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        type: DataTypes.DATE, // Use DATE for timestamp
        allowNull: false,
        defaultValue: DataTypes.NOW
      }
  });


Service.getAllService = async function () {
    try {
      return await Service.findAll({
        include: [
          {
           model: sequelize.model('booking'),
            as: 'bookings', 
          },
        ],
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Something went wrong" });
    }
};


Service.getService = async function (id) {
    try {
      return await Service.findAll({where:{id:id}});
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Something went wrong" });
    }
};

Service.associate = (models) => {
    Service.hasMany(models.booking, { foreignKey: 'services_id', as: 'bookings' });
};


  return Service;
};