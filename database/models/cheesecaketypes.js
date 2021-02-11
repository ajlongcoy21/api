'use strict';
const Sequelize = require('sequelize');

// create cheesecaketype class for sequelize

module.exports = (sequelize) => 
{
  /*
        CheesecakeTypes has the following informaiton
        index (Integer, primary key, auto-generated)
        type (String)
  */

    class CheesecakeTypes extends Sequelize.Model {}

    CheesecakeTypes.init(
    {
      index: 
      {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      type: 
      {
        type: Sequelize.STRING,
        allowNull: false,
        validate: 
        {
          notEmpty: {msg: 'Please enter a cheesecake type.' },
          notNull: { msg: 'Please enter a cheesecake type.' }
        }
      },
      price: 
      {
        type: Sequelize.INTEGER,
        allowNull: true,
        validate: 
        {}
      }
    }, { sequelize, timestamps: false  });

    CheesecakeTypes.sync();
  
    CheesecakeTypes.associate = (models) => {
        // TODO Add associations.
        CheesecakeTypes.hasMany(models.Cheesecakes, {as: 'Cakes' , foreignKey:{ fieldName: 'type', allowNull: false }});
      };

    return CheesecakeTypes;
};