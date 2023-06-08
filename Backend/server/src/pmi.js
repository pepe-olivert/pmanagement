const { Router } = require("express");
const db = require("./db");
const pmi = Router();

pmi.get("/projects", async (req, res) => {
  try {
    const projectList = await db.getProjectList();
    res.status(200).json(projectList);
  } catch (e) {
    res.status(500).json({ error: e.toString() });
  }
});

pmi.get("/showtasks/:id", async (req, res) => {
  try {
    
    const id = req.params.id
    
    const tasks = await db.showtasks(id);
    res.status(200).json(tasks);
  } catch (e) {
    res.status(500).json({ error: e.toString() });
  }
});

pmi.post("/register",async (req,res) => {
  try{
    
    const email= req.body.email
    const p=req.body.password
    const r = req.body.rol
    
    const registered = await db.register(email,p,r)
    return res.status(200).json(registered)
  }catch (e){
    console.log(e)
    return res.status(500).json({ error: e.toString() });
  }
})

pmi.post("/updateproject",async (req,res) => {
  try{
    const id= req.body.id
    
    const pr=req.body.project_requirements
    const pb= req.body.project_budget
    
    const m=req.body.milestones
    
    
    const updated = await db.updateproject(id,pr,pb,m)
    return res.status(200).json(updated)
  }catch (e){
    console.log(e)
    return res.status(500).json({ error: e.toString() });
  }
})

pmi.post("/updateprojectstate",async (req,res) => {
  try{
    const id= req.body.id
    
    
    const updated = await db.updateprojectstate(id)
    
    return res.status(200).json(updated)
  }catch (e){
    console.log(e)
    return res.status(500).json({ error: e.toString() });
  }
})

pmi.post("/createTask",async (req,res) => {
  try{
    const a=req.body
    
    const returned=[]
    for (i in a){
      const p_id=a[i].projects_id
      const name= a[i].name
      const unit= a[i].unit
      const q=a[i].quantity
      
      
      
      const updated = await db.createTask(p_id,name,unit,q);
      returned.push(updated)
    }
    return res.status(200).json(returned)
  }catch (e){
    console.log(e)
    return res.status(500).json({ error: e.toString() });
  }
})

pmi.post("/login",async (req,res) => {
  try{
    
    const email= req.body.email
    const p=req.body.password
    
    
    const logged = await db.login(email,p)
    if (logged.token){return res.status(200).json(logged)}
    else{res.status(500).json(logged.message)}
  }catch (e){
    console.log(e)
    return res.status(500).json({ error: e.toString() });
  }
})

pmi.get("/getProjects/:token",async (req,res) => {
  try{
    const token= req.params.token
    const decoded= await db.decodeToken(token)
    const name= decoded.email
    const x= await db.getuserid(name)
    const id= x[0].users_id
    

    const projects = await db.getProjectList(id)
  
    
    return res.status(200).json(projects)
  }catch (e){
    console.log(e)
    return res.status(500).json({ error: e.toString() });
  }
})

pmi.post("/setProject",async (req,res) => {
  try{   
     
      const p_class = req.body.p_class
      const p_name = req.body.p_name
      const starting_date=req.body.starting_date
      const ending_date = req.body.ending_date
      const newproject = await db.setProject(p_class,p_name,starting_date,ending_date)
      
      const users_id= req.body.users_id
      const newusersprojects = await db.setUserProject(users_id,newproject)

      return res.status(200).json(newproject, newusersprojects)
  }catch (e){
    console.log(e)
    return res.status(500).json({ error: e.toString() });
  }
})

pmi.get("/getUsers", async (req, res) => {
  try {
    const users = await db.getUsers();
    res.status(200).json(users);
  } catch (e) {
    res.status(500).json({ error: e.toString() });
  }
});

pmi.post("/setTeamMember",async (req,res) => {
  try{    
      const users_id=req.body.users_id
      const rol = req.body.rol
      const rolTeamMember = await db.setRolTeamMember(users_id, rol)
      

      const projects_id = req.body.projects_id
      const newTeamMember = await db.setTeamMember(users_id,projects_id)

      return res.status(200).json(rolTeamMember, newTeamMember)
  }catch (e){
    console.log(e)
    return res.status(500).json({ error: e.toString() });
  }
})

pmi.post("/createTask",async (req,res) => {
  try{
    const a=req.body
    
    const returned=[]
    for (i in a){
      const p_id=a[i].projects_id
      const name= a[i].name
      const unit= a[i].unit
      const q=a[i].quantity
      
      
      const updated = await db.createTask(p_id,name,unit,q);
      returned.push(updated)
    }
    return res.status(200).json(returned)
  }catch (e){
    console.log(e)
    return res.status(500).json({ error: e.toString() });
  }
})

pmi.get("/getRol", async (req, res) => {
  try {

    const users_id=req.body.userid;
    console.log(users_id);

    const users = await db.getRolTeamMember(users_id);
    res.status(200).json(users);
  } catch (e) {
    res.status(500).json({ error: e.toString() });
  }
});







module.exports = pmi;