const { Sequelize } = require("sequelize");
const { username, password, database, host_ } = require("../config.json");

const sequelize = new Sequelize(database, username, password, 
    {
        logging: false,
        host: host_,
        dialect: "postgres",
    }
);

module.exports = {
  sequelize,
};
