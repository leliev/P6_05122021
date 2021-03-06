const express = require('express');
//Add security layers to headers
const helmet = require('helmet');

const mongoose = require('mongoose');
const path = require('path');

//importing routes
const userRoutes = require('./routes/user');
const sauceRoutes = require('./routes/sauce');

//Database connection
mongoose
  .connect(process.env.MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connection success !'))
  .catch(() => console.log('MongoDB connection failed !'));

const app = express();

app.use(helmet());

//Grant access to request body (usable data)
app.use(express.json());

//Settings for CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});
//serve the static images folder
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/auth', userRoutes);
app.use('/api/sauces', sauceRoutes);

module.exports = app;