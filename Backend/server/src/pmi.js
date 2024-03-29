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

pmi.get("/showm/:id", async (req, res) => {
  try {
    
    const id = req.params.id
    
    const tasks = await db.showm(id);
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
    
    
    
    
    const updated = await db.updateproject(id,pr,pb)
    return res.status(200).json(updated)
  }catch (e){
    console.log(e)
    return res.status(500).json({ error: e.toString() });
  }
})

pmi.post("/updateP",async (req,res) => {
  try{
    const tid= req.body.tid
    
    const pid=req.body.pid
    
    const updated = await db.updateprofile(pid,tid)
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



pmi.get("/getrol/:id", async (req, res) => {
  try {
    const id = req.params.id
    
    const rol = await db.getRolTeamMember(id);
    res.status(200).json(rol);
  } catch (e) {
    res.status(500).json({ error: e.toString() });
  }
});


pmi.get("/gettasksid/:id", async (req, res) => {
  try {
    const id = req.params.id;
    
    const taskid = await db.getTaskId(id);


    res.status(200).json(taskid);
  } catch (e) {
    res.status(500).json({ error: e.toString() });
  }
});


pmi.post("/updateM", async (req,res)=>{

  try{
    
    const p_id=req.body.id
    const name=req.body.nombre
    const sd = req.body.date
    
    const update = await db.createM(p_id,name,sd)
    return res.status(200).json(update)

  }catch (e){
    console.log(e)
    return res.status(500).json({ error: e.toString() });
  }
});


pmi.get("/gettasksbyid/:id", async (req, res) => {
  try {
    const id = req.params.id;
    
    const tasks = await db.getTasksById(id);

    res.status(200).json(tasks);
  } catch (e) {
    res.status(500).json({ error: e.toString() });
  }
});







module.exports = pmi;