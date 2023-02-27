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
    const ps= req.body.project_scope
    const pr=req.body.project_requirements
    const pb= req.body.project_budget
    const ct=req.body.completion_time
    const m=req.body.milestones
    
    const updated = await db.updateproject(id,ps,pr,pb,ct,m)
    return res.status(200).json(updated)
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






module.exports = pmi;