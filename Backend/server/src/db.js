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
    SELECT p.projects_id,p.name,p.class FROM projects p, users_projects u WHERE u.users_id=$1 and p.projects_id=u.projects_id
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

const updateprojectSQL=`UPDATE projects SET project_scope=$2, project_requirements=$3,project_budget=$4,completion_time=$5,milestones=$6,state=$7 WHERE projects_id=$1`;

const updateproject=  async (id,ps,pr,pb,ct,m) => {
  
  const state = "ON INITIATE"
  const res = await pool.query(updateprojectSQL,[id,ps, pr, pb,ct,m,state]);
  ;
  

  const message= {message: "Your project has been initiated! "}
  return message;
  
}

const updateprojectstateSQL=`UPDATE projects SET state=$2 WHERE projects_id=$1`;

const updateprojectstate=  async (id) => {
  
  const state = "PLANNED ON"
  const res = await pool.query(updateprojectstateSQL,[id,state]);
  ;
  

  const message= {message: "Your project it's planned on! "}
  return message;
  
}

const showtasksSQL=`SELECT * FROM tasks WHERE project_id=$1`;

const showtasks=  async (id) => {
  
  
  const res= await pool.query(showtasksSQL,[id]);
  
  return res.rows

  ;
  

  ;
  
}

const loginSQL=`SELECT * FROM users WHERE email=$1`;

const login=  async (email,password) => {
  
  const {rows} =  await pool.query(loginSQL,[email]);
  
  if (rows.length === 0){return {message: `Not users found with this email or password`}}
  else{
  
  const validate= await bcrypt.compare(password,rows[0].password);
  
  if(validate===true){
    const token= createToken(email);
    
    return {token:token,userid:rows[0].users_id};}
  else{return {message: "La contraseña no coincide"}}
  };
  
}

const createTaskSQL=`INSERT INTO "tasks" (project_id,name,unit,quantity) VALUES ($1,$2,$3,$4)`;

const createTask=  async (projects_id,name,unit,quantity) => {
  
  
  const res = await pool.query(createTaskSQL,[projects_id,name,unit,quantity]);
  
  ;
  

  const message= {message: "Task created correctly! "}
  console.log(message)
  return message;
  
}





module.exports = {
  getProjectList,
  register,
  login,
  decodeToken,
  createToken,
  getuserid,
  updateproject,
  createTask,
  updateprojectstate,
  showtasks
};