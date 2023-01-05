
var cfg = {}

try {
  cfg = require('./config.json')
} catch (error) {
  cfg = {}
}

var config = {}
config.DATABSE = process.env.DATABASE || cfg.DATABASE
config.USERNAME = process.env.USERNAME || cfg.USERNAME
config.PASSWORD = process.env.PASSWORD || cfg.PASSWORD
config.HOST =  process.env.HOST || cfg.HOST
config.API_URL = process.env.API_URL || cfg.API_URL 

module.exports = config