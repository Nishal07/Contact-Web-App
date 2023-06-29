const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "users",
  password: process.env.MY_DB_PASSWORD,
  port: 5432,
});

module.exports = pool;
