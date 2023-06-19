import { useEffect, useState } from "react";
import * as api from "./components/api";
import "./styles/App.css";
import Header from "./components/header.jsx";

import { format } from "date-fns";

import Login from "./components/login.jsx"
import SetProject from "./components/setProject.jsx"
import Showinfo from "./components/showinfo.jsx"

function App({onInfo,onProject}) {
  
  const [p,setp]=useState([]);
  const [token, setToken] = useState(null)
  const [project, setProject] = useState(false);
  const [info,setinfo]= useState(false)
  const [mode, setMode] = useState("login");
  const [aux, setaux] = useState([]);
  const [rol,setrol]=useState("");


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
      }

      else{return {message: 'We are sorry but something went wrong...'}}

      const userid = localStorage.getItem("userid");
      const users=await api.getRol()

        
        if (users.success){
          const id = userid
          setrol(id);
          console.log(rol);
          
        }
        else{return {message: 'We are sorry but something went wrong...'}}


      }
        


  

  const createNewProject = ()=> {
    
    setProject(true);
  }

  
  if(project === true){
    return <SetProject onInfo={comingbackinfo} onProject={falseproject}/>
  }
  if (token === null) {

    return <Login onLogin={login} onchangemode={setmodefn} />;}

    else{
      if (info===true){return <Showinfo onInfo={comingbackinfo} onRecieved={aux}/>}
      else if(rol !== 2){
        console.log(rol)
      return (
      

      <div onLoad={searchProjectsUser}>
          <header>
            <Header onLogout={logout}/>
          </header>

          <body>



          
            <button className="btn-newproject" onClick={()=>{setProject(true);setinfo(true);}}>New Project </button> 

            
          <div>
                
                <table className="table-ini">
                  <tr>
                    <th>Project Name</th>
                    <th>Project Class</th>
                    <th>Starting Date</th>
                    <th>Ending Date</th>
                  </tr>
                  {p.map(p=>(
                    <tr>
                      <td><button className="btn-pname" onClick={()=>{const datum = [p.projects_id,p.name,p.class,p.project_scope,p.project_requirements,p.project_budget,p.milestones]; setaux(datum);setinfo(true)}}> {p.name}</button></td>
                      <td> {p.class}</td>

                      <td> {format(new Date(p.starting_date), "MMMM do, yyyy ")}</td>
                      
                      <td> {format(new Date(p.ending_date), "MMMM do, yyyy ")}</td>
                      
                      <td> {p.projects_id}</td>

                    </tr>
                  ))}
                </table>
          </div>
            
              

          </body>

          

          

      </div>


      )

    }else if(rol === 3){
      console.log('hola')
    }
    
    }
  }


export default App;