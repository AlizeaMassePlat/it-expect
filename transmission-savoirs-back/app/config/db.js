require("dotenv").config();
const { Client } = require("pg");
const client = new Client({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  // ssl: {
  //   // do not fail on invalid certs
  //   rejectUnauthorized : false,
  // },
});

client.connect();

module.exports = client;
