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

pmi.post("/setProject",async (req,res) => { // no se si es necesario utilizar el token
  // si no entiendo mal el token es un valor que está encriptado y que se puede utilizar en multiples ocasiones, ya sea como contraseña o como url, etc
  try{    
    const project_id= req.body.project_id
    const beginning_date=req.body.beginning_date
    const ending_date = req.body.ending_date
    const users_id = req.body.users_id
    
    const newproject = await db.setProject(project_id,beginning_date,ending_date,users_id)//no coge el metodo setProject de la clase db
    return res.status(200).json(newproject)
  }catch (e){
    console.log(e)
    return res.status(500).json({ error: e.toString() });
  }
})






module.exports = pmi;