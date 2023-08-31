const Pool = require('pg').Pool;
require('dotenv').config()

const pool = new Pool ({
  user: process.env.POOL_USER,
  password: process.env.POOL_PASSWORD,
  host: process.env.POOL_HOST,
  port: 5432,
  database: "postgres"
})

module.exports = pool;