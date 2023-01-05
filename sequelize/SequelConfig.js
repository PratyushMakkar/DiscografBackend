const { Sequelize } = require("sequelize");
const config = require('../config')

const sequelize = new Sequelize(config.DATABSE, config.USERNAME, config.PASSWORD,
    {
        logging: false,
        host: config.HOST,
        dialect: "postgres",
        
    }
);

module.exports = {
  sequelize,
};
