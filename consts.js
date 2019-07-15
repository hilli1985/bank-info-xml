require('dotenv').config();
const url = process.env.BANK_API;
const port = process.env.PORT_SERVER;

module.exports = {
  url,
  port
};
