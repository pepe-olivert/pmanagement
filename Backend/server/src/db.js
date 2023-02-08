const { Pool } = require("pg");
const bcrypt = require ('bcrypt');
const saltRounds=10;

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

const registerSQL=`INSERT INTO "users" (email,password,rol) VALUES ($1,$2,$3)`;

const register=  (email,password,rol) => {
  
  bcrypt.hash(password,saltRounds, async (err,hash) => {
    const res = await pool.query(registerSQL,[email, hash, rol]);
    ;
  })

  const message= {message: "User registered correctly! "}
  return message;
  
}

const loginSQL=`SELECT * FROM users WHERE email=$1`;

const login=  async (email,password) => {
  
  const {rows} =  await pool.query(loginSQL,[email]);
  
  if (rows.length === 0){return {message: `Not users found with this email or password`}}
  else{
  
  const validate= await bcrypt.compare(password,rows[0].password);
  
  if(validate===true){return rows;}
  else{return {message: "La contraseña no coincide"}}
  };
  
}


module.exports = {
  getProjectList,
  register,
  login
};