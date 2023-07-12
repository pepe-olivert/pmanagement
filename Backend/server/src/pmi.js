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
    console.log(req.body)
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
    const rend= req.body.rend
    
    const updated = await db.updateprofile(pid,tid,rend)
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
      const sd = a[i].sd
      const ed = a[i].ed
      
      
      
      const updated = await db.createTask(p_id,name,unit,q,sd,ed);
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

pmi.get("/infotask/:tid",async (req,res) => {
  try{
    const tid= req.params.tid
    
    const pid = await db.getprofiles(tid)
    const perfiles = []
    const rends = []
    
    for (p in pid){
      const perf = await db.getProfName(pid[p].profiles_id)
      perfiles.push(perf)
      const rend = await db.getRend(tid,pid[p].profiles_id)
      rends.push(rend)
     
    }

    const final= {"pid":pid,"pname":perfiles,"rends":rends}
    
    return res.status(200).json(final)
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

pmi.get("/showtm/:id", async (req, res) => {
  try {
    const id = req.params.id
    const selected = []

    const users = await db.showtm();
    for (let u in users){
      const user_id=users[u].users_id
      const s = await db.check(user_id,id)
      if (s.length > 0 ){selected.push(users[u])}

      
    }
    console.log(selected)

    res.status(200).json(selected);
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

pmi.post("/addtmb",async (req,res) => {
  try{    
      
      const values = req.body.array
      const pid = req.body.pid
      for (v in values){
        const response = await db.addtmb(values[v],pid)
      }

      return res.status(200).json("Team members added correctly")
  }catch (e){
    console.log(e)
    return res.status(500).json({ error: e.toString() });
  }
})

pmi.post("/addtmbtask",async (req,res) => {
  try{    
      
      const values = req.body.mid
      const pid = req.body.tid
      
      
      const response = await db.addtmbtask(values,pid)
    

      return res.status(200).json("Team members added correctly")
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

pmi.get("/showtmbtasks/:id/:pid", async (req, res) => {
  try {
    const userid = req.params.id;
    const pid = req.params.pid
    
    const ids = await db.tasksid(userid);

    
    

    const tasks = []

    for (let i in ids){

      const task = ids[i].tasks_id
      const info = await db.infotask(task,pid)
      if (info.length>0){tasks.push(info)}
      

    }

    

    

    

    res.status(200).json(tasks);
  } catch (e) {
    res.status(500).json({ error: e.toString() });
  }
});







module.exports = pmi;