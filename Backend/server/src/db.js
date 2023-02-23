const { Pool } = require("pg");
const bcrypt = require ('bcrypt');
const saltRounds=10;
const jwt = require ('jsonwebtoken');
const JWT_SECRET = "topsecret"; 
const JWT_EXPIRATION = "1d";

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE } = require("./config");

const pool = new Pool({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
});

const createToken = (email) => {
  const token = jwt.sign({email}, JWT_SECRET, {expiresIn: JWT_EXPIRATION});
  
  
  return {
      accessToken: token,
      
      username: email,
      tokenType: "Bearer",
      expiresIn: JWT_EXPIRATION,
  };

  
}

const decodeToken = (token) => {
  try{
      const result = jwt.verify (token,JWT_SECRET);
      return result;

  }
  catch(e) {
      switch(e.name){
          case "JsonWebTokenError":{
              errUnauthorized(`Ẁrong token`);
              break;
          }
          case "TokenExpiredError":{
              errUnauthorized(`Token expired` );
              break;
          }
          default:
              throw e;
      }
  }

  
}

const getuseridSQL=`SELECT users_id FROM users WHERE email=$1`

const getuserid= async(email)=>{
  const {rows}=await pool.query(getuseridSQL,[email])
  return rows
}

const getProjectListSQL = `
    SELECT p.name FROM projects p, users_projects u WHERE u.users_id=$1 and p.projects_id=u.projects_id
`;
const getProjectList = async (id) => {
const { rows } = await pool.query(getProjectListSQL,[id]);
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
  
  if(validate===true){
    const token= createToken(email);
    
    return {token:token};}
  else{return {message: "La contraseña no coincide"}}
  };
  
}

const insertProject=`INSERT INTO "projects" (project_id,beginning_date,ending_date) VALUES ($1,$2,$3);
                     INSERT INTO "users_projects" (users_id,projects_id) VALUES ($4,$1);`;

const setProject =  async (project_id,beginning_date,ending_date, users_id) => {
  
  const res = await pool.query(insertProject,[project_id, beginning_date, ending_date, users_id]);

  const message= {message: "Project created correctly! "}
  return message;
  
}




module.exports = {
  getProjectList,
  register,
  login,
  decodeToken,
  createToken,
  getuserid,
  setProject
};