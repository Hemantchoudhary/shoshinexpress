require('dotenv').config();
const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const apiRoutes = require('./routes/apiRoutes');
// const appoitmentRoutes = require('./routes/appointmentRoutes');
const cors = require('cors');



const Sequelize = require('sequelize');
const sequelizeConfig = require('./config/config');

const env = process.env.NODE_ENV || 'development';
const sequelize = new Sequelize(sequelizeConfig[env]);


app.use(cors());

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
  


app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api', apiRoutes);
// app.use('/api/services',appoitmentRoutes);


// Use other routes similarly

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});