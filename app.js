'use strict';

// load modules
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { sequelize, models } = require('./database/index.js');

const cheesecakesRoute = require('./routes/cheesecakesRoute');
const orderFormRoute = require('./routes/orderFormRoute');
//const adminRoute = require('./routes/adminRoute');

// variable to enable global error logging
const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';

// create the Express app
const app = express();

// allow CORS
//app.use(cors({origin: true, credentials: true}));
app.use(cors());

// setup morgan which gives us http request logging
app.use(morgan('dev'));

// Setup request body JSON parsing.
app.use(express.json());

// TODO setup your api routes here

// setup a friendly greeting for the root route
app.get('/', async (req, res) => {

  // test connection to db
  try 
  {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');    
  } 
  catch (error) 
  {
    console.error('Unable to connect to the database:', error);
  }
  
  res.json({ message: 'Hello and welcome to the REST API project!' });

});

app.use(cheesecakesRoute);
app.use(orderFormRoute);
//app.use(adminRoute);

// send 404 if no other route matched
app.use((req, res) => 
{
  res.status(404).json({
    message: 'Route Not Found',
  });
});

// setup a global error handler
app.use((err, req, res, next) => 
{
  if (enableGlobalErrorLogging) 
  {
    console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
  }

  res.status(err.status || 500).json({
    message: err.message,
    error: {},
  });

});

// set our port
app.set('port', process.env.PORT || 5000);

// start listening on our port
const server = app.listen(app.get('port'), () => 
{
  console.log(`Express server is listening on port ${server.address().port}`);
});