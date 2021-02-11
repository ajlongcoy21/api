'use strict';
const Sequelize = require('sequelize');

// create cheesecakes class for sequelize

module.exports = (sequelize) => 
{
    class Cheesecakes extends Sequelize.Model {}
    
    /*
    Cheesecakes has the following informaiton
        index (Integer, primary key, auto-generated)
        type (String)
    */
   
   Cheesecakes.init(
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
          notEmpty: {msg: 'Please select a cheesecake type.' },
          notNull: { msg: 'Please select a cheesecake type.' }
        }
      },
      fruit: 
      {
        type: Sequelize.STRING,
        allowNull: true,
        validate: 
        {}
      },
      specialty: 
      {
        type: Sequelize.STRING,
        allowNull: true,
        validate: 
        {}
      },
      name: 
      {
        type: Sequelize.STRING,
        allowNull: false,
        validate: 
        {
            notEmpty: {msg: 'Please enter a cheesecake name.' },
            notNull: { msg: 'Please enter a cheesecake name.' }
        }
      },
      description: 
      {
        type: Sequelize.STRING,
        allowNull: true,
        validate: 
        {}
      },
      adjprice: 
      {
        type: Sequelize.INTEGER,
        allowNull: true,
        validate: 
        {}
      },
      image: 
      {
        type: Sequelize.BLOB,
        allowNull: true,
        validate: 
        {}
      }
    }, { sequelize, timestamps: false });

    Cheesecakes.sync();
  
    Cheesecakes.associate = (models) => {
        // TODO Add associations.
        Cheesecakes.belongsTo(models.CheesecakeTypes, {as: 'Type' , foreignKey:{ fieldName: 'type', allowNull: false }});
      };

    return Cheesecakes;
};