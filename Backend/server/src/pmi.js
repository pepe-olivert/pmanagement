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
    return res.status(200).json(logged)
  }catch (e){
    console.log(e)
    return res.status(500).json({ error: e.toString() });
  }
})






module.exports = pmi;