const { Pool } = require("pg");

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE } = require("./config");

const pool = new Pool({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
});

const getProjectListSQL = `
SELECT * FROM projects
`;
const getProjectList = async () => {
const { rows } = await pool.query(getProjectListSQL);
return rows;
};

module.exports = {
  getProjectList
};