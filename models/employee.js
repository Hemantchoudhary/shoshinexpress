'use strict'
const { DataTypes } = require('sequelize');

module.exports = sequelize => {
    const Employee = sequelize.define('employee', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        adress: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true
        },
        mobile_no: {
            type: DataTypes.NUMBER,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        managers_id: {
            type: DataTypes.NUMBER,
            allowNull: false,
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



    Employee.userAlreadyExits = async function (loginDetails) {
        try {
            const { username } = loginDetails;
            return await Employee.findOne({
                where: {
                    username: username,
                }
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({ error: "user already exits " });
        }
    };

    Employee.allEmployee = async function () {
        try {
          return await Employee.findAll({
            include: [
              {
                model: sequelize.model('manager'),
                as: 'managers', // Make sure this matches the alias defined in your Employee model
              },
            ],
          });
        } catch (err) {
          console.log(err);
          return res.status(500).json({ error: "Something went wrong" });
        }
      };

    Employee.createUser = async function (loginDetails) {
        try {
            const users = await Employee.create(loginDetails);
            return users
        } catch (err) {
            console.log(err)
            return res.status(500).json({ error: "Failed to create employee" });
        }
    };

    // // Employee.belongsTo(sequelize.models.manager, { foreignKey: 'managers_id', as: 'manager' });

    Employee.associate = (models) => {
        Employee.belongsTo(models.manager, { foreignKey: 'managers_id', as: 'managers' });
      };



    return Employee;
};