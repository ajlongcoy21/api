const express = require('express');
const { check, validationResult } = require('express-validator');

const router = express.Router();
const Cheesecakes  = require('../database').models.Cheesecakes;
const CheesecakeTypes = require('../database').models.CheesecakeTypes;


/* Handler function to wrap each route. */
function asyncHandler(cb)
{
  return async(req, res, next) => {
    try 
    {
      await cb(req, res, next)
    } 
    catch(error) // Catch error thrown
    {
      // send error to global error handler
      next(error);
    }
  }
}

/* GET cheesecake type route will show the list of cheesecake types in the database. */
router.get('/api/cheesecake-types', async (req, res) => 
{

    try 
    {
      // Code to get and return the courses...
      const cheesecakeTypes = await CheesecakeTypes.findAll({
        include: [ { model: Cheesecakes, as: 'Cakes' }]
      });
  
      // Respond to user with JSON object with coursess
      res.json(cheesecakeTypes);
      
    } 
    catch (error) 
    {
      // Check to see if the error was a validation error
      if(error.name === "SequelizeValidationError") 
      {
        // If it is a validation error set the 400 status code
        error.status = 400;
      }
  
      // Send error to global error handler
      throw error;
    }
    
});

/* GET cheesecakes route will show the list of cheesecakes in the database. */
router.get('/api/cheesecakes', async (req, res) => 
{

    try 
    {
      // Code to get and return the courses...
      const cheesecakes = await Cheesecakes.findAll({
        include: [ { model: CheesecakeTypes, as: 'Type' }]
      });
  
      // Respond to user with JSON object with coursess
      res.json(cheesecakes);
      
    } 
    catch (error) 
    {
      // Check to see if the error was a validation error
      if(error.name === "SequelizeValidationError") 
      {
        // If it is a validation error set the 400 status code
        error.status = 400;
      }
  
      // Send error to global error handler
      throw error;
    }
    
});

// export router

module.exports = router;