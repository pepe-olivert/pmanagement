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

    SELECT * FROM projects p, users_projects u WHERE u.users_id=$1 and p.projects_id=u.projects_id

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

const updateprojectSQL=`UPDATE projects SET  project_requirements=$2,project_budget=$3,state=$4 WHERE projects_id=$1`;

const updateproject=  async (id,pr,pb) => {
  
  const state = "ON INITIATE"
  
  const res = await pool.query(updateprojectSQL,[id, pr, pb,state]);
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

  ;}

const showmSQL=`SELECT * FROM mstones WHERE project_id=$1`;

const showm=  async (id) => {
  
  
  const res= await pool.query(showmSQL,[id]);
  
  return res.rows

  ;}

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


const insertProject=`
  INSERT INTO "projects" (class,name,starting_date,ending_date,state) VALUES ($1,$2,$3,$4,$5) 
  RETURNING *;`;

const setProject =  async (p_class,p_name,starting_date,ending_date) => {
  const state = "CREATED"
  
  const res = await pool.query(insertProject,[p_class,p_name, starting_date, ending_date,state]);
  
  return res.rows[0].projects_id;
  
}

const insertUserProject=`
  INSERT INTO "users_projects" (users_id,projects_id) VALUES ($1,$2)`;

const setUserProject=  async (users_id,projects_id) => {
  
  const res = await pool.query(insertUserProject,[users_id,projects_id]);
  const message= {message: "Project created correctly! "}
  return message;
  
}

const selectUsers = `SELECT users_id, rol, email FROM users;`;

const getUsers =  async () => {
  
  const { rows }  = await pool.query(selectUsers);
  //const message= {message: "The username is: " + email}
  return rows;
  
}

const insertTeamMember = `INSERT INTO "users_projects" (users_id,projects_id) VALUES ($1,$2)`;

const setTeamMember = async (users_id,projects_id) => {

  const res = await pool.query(insertTeamMember,[users_id,projects_id]);
  const message= {message: "Team Member inserted correctly! "}
  return message;

}

const updateRolTeamMember = `UPDATE "users" SET rol=$2 WHERE users_id=$1;`;

const setRolTeamMember = async (users_id,rol) => {

  const res = await pool.query(updateRolTeamMember,[users_id,rol]);
  return res;

}

const createTaskSQL=`INSERT INTO "tasks" (project_id,name,unit,quantity) VALUES ($1,$2,$3,$4) RETURNING *;`;

const createTask=  async (projects_id,name,unit,quantity) => {
  
  const res = await pool.query(createTaskSQL,[projects_id,name,unit,quantity]);


  const message= {message: "Task created correctly! "}
  
  return res;
  
}

const createMSQL=`INSERT INTO "mstones" (project_id,nombre,sdate) VALUES ($1,$2,$3)`;

const createM=  async (projects_id,name,date) => {
  
  const res = await pool.query(createMSQL,[projects_id,name,date]);


  const message= {message: "Milestone created correctly! "}
  
  return message;
  
}

const updateprofileSQL=`INSERT INTO "profiles_tasks" (profiles_id,tasks_id) VALUES ($1,$2)`;

const updateprofile=  async (pid,tid) => {
  
  const res = await pool.query(updateprofileSQL,[pid,tid]);


  const message= {message: "Profile added to the task! "}
  
  return message;
  
}


const selectRolUser = `SELECT rol FROM users WHERE users_id=$1;`;

const getRolTeamMember =  async (id) => {
  
  const rows  = await pool.query(selectRolUser, [id]);
  //const message= {message: "The username is: " + email}
  
  
}





module.exports = {
  getProjectList,
  register,
  login,
  decodeToken,
  createToken,
  getuserid,
  showm,
  updateproject,
  createTask,
  updateprojectstate,
  showtasks,
  createM,
  setProject,
  setUserProject,
  getUsers,
  setTeamMember,
  setRolTeamMember,
  createTask,
  getRolTeamMember,
  updateprofile

};