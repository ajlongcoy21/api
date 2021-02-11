'use strict';

const { Sequelize } = require('sequelize');
const config = require('../config/config.json');

const models = {};

process.env.NODE_ENV = 'development';

// setup sequelize configuraiton

let sequelize;

if (process.env.NODE_ENV === 'development') 
{
  sequelize = new Sequelize(config.development);
  console.log('Setup sequelize and ready for imports');

}
else
{
  console.log('USING ONLINE DATABASE');
  
    // update later for live database
    
  sequelize = new Sequelize('TTC', 'ajlongcoy21', 'Helena1291', {
        host: 'tastefullytiffanyscheesecakes.database.windows.net',
        dialect: 'mssql',
        dialectOptions: {
          options: { encrypt: true }
        },
        pool: {
          max: 5,
          min: 0,
          idle: 10000
        }
      });
}

// Import all of the models.

var CheesecakeTypes = require('./models/cheesecaketypes')(sequelize, Sequelize);
var Cheesecakes = require('./models/cheesecakes')(sequelize, Sequelize);

models[CheesecakeTypes.name] = CheesecakeTypes;
models[Cheesecakes.name] = Cheesecakes;

// If available, call method to create associations.
Object.keys(models).forEach((modelName) => 
{      
  if (models[modelName].associate) 
  {
      console.info(`Configuring the associations for the ${modelName} model...`);
      models[modelName].associate(models);
  }

});

sequelize.authenticate()
  .then(function (error) { console.log('Connection has been established successfully.'); })
  .catch(function (error) { console.log('Unable to connect to the database:', err); });

models.sequelize = sequelize;
models.sequelize = sequelize;

module.exports = {sequelize, models};
