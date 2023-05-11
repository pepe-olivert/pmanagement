import { useEffect, useState } from "react";
import * as api from "./components/api";
import "./App.css";
import Header from "./components/header.jsx";

import Login from "./components/login.jsx"

import SetProject from "./components/setProject.jsx"
import AddTeamMembers from "./components/addTeamMembers.jsx"
import Showinfo from "./components/showinfo.jsx"

function App({onInfo,onProject}) {
  
  const [p,setp]=useState([]);
  const [token, setToken] = useState(null)
  const [project, setProject] = useState(false);
  const [info,setinfo]= useState(false)
  const [mode, setMode] = useState("login");
  const [aux, setaux] = useState([]);
  const [rol,setrol]=useState([]);


  const login = (token) => {
    setToken(token);
    localStorage.setItem("token", JSON.stringify(token));
    localStorage.setItem("userid",token.userid);
  };

  const setmodefn = (toggle) => {
    setMode(toggle);
  };

  
  

  const comingbackinfo= ()=>{
    
    setinfo(false)
  }

  const logout = () => {
    setToken(null);
  };

  const falseproject=()=>{
    setProject(false);
  };


  

  const searchProjectsUser=async ()=> {
      
      const localToken= JSON.parse(localStorage.getItem("token"))
      const decodeToken=localToken.token.accessToken
      const projects=await api.getProjects(decodeToken)
      
      
      if (projects.success){
        const allProjects=projects.projects
        setp(allProjects)
      console.log(allProjects)}

      else{return {message: 'We are sorry but something went wrong...'}}

      const userid = localStorage.getItem("userid");
      const users=await api.getRol()
        
        if (users.success){
          const id = userid
          setrol(id);
          
        }
        else{return {message: 'We are sorry but something went wrong...'}}


      }
        


  

  const createNewProject = ()=> {
    
    setProject(true);
  }

  

  if (token === null) {

    return <Login onLogin={login} onchangemode={setmodefn} />;}

  else{
    if (info===true){
      if (project === true){
        return <SetProject onInfo={comingbackinfo} onProject={falseproject}/>
      }
      else{
      return <Showinfo onInfo={comingbackinfo} onRecieved={aux}/>}}
    else{

    return (
      

      <div onLoad={searchProjectsUser}>
          <header>
            <Header onLogout={logout}/>
          </header>

          <body>


          
            <button className="btn-newproject" onClick={()=>{setProject(true);setinfo(true);}}>New Project </button> 
            
          <div>
                
                <table>
                  <tr>
                    <th>Project Name</th>
                    <th>Project Class</th>
                    <th>Starting Date</th>
                    <th>Ending Date</th>
                    <th>Project Scope</th>
                    <th>Project Requirements</th>
                    <th>Project Budget</th>
                    <th>Completion Time</th>
                    <th>Milestones</th>
                    <th>Project ID</th>

                  </tr>
                  {p.map(p=>(
                    <tr>
                      <td><button className="btn-pname" onClick={()=>{const datum = [p.projects_id,p.name,p.class]; setaux(datum);setinfo(true)}}> {p.name}</button></td>
                      <td> {p.class}</td>
                      <td> {p.starting_date}</td>
                      <td> {p.ending_date}</td>
                      <td> {p.project_scope}</td>
                      <td> {p.project_requirements}</td>
                      <td> {p.project_budget}</td>
                      <td> {p.completion_time}</td>
                      <td> {p.milestones}</td>
                      <td> {p.projects_id}</td>
                    </tr>
                  ))}
                </table>
          </div>
            
              

          </body>

          

          

      </div>


    )

                }
    
    } 
  }


export default App;