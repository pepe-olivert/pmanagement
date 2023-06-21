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
  const [t,sett]=useState([]);

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

      /*----------------------VIEW TEAM MEMBER-------------------------*/
      const userid = localStorage.getItem("userid");
      const userid_number = parseInt(userid, 10);
      const users=await api.getrol(userid_number)

      if(users.success){
        const rol_user = users.rol;
        const rol_arr = Object.values(rol_user[0])
        setrol(rol_arr[0]);
      }
      const listed =  await api.gettasksid(userid_number);

      if (listed.success){
        const taskid= listed.tasksid;
        const taskid_arr = Object.values(taskid[0])
        console.log(taskid_arr[0])

        const gettasksbyid =  await api.gettasksbyid(taskid_arr[0]);
        if(gettasksbyid.success){
          const tasks = gettasksbyid.tasksbyid;
          sett(tasks);
        }
      }
      else{return {message:"No tasks identified"}}

      /*------------------------------------------------------------------*/
    }    
  
  if(project === true){
    return <SetProject onInfo={info}/>
  }
  if (token === null) {

    return <Login onLogin={login} onchangemode={setmodefn} />;}

    else{
      if (info===true){return <Showinfo onInfo={comingbackinfo} onRecieved={aux}/>}
      else if(rol !== 'Team Member'){
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
                    </tr>
                  ))}
                </table>
          </div>
            
              

          </body>

          

          

      </div>


      )

    }else if(rol === 'Team Member'){
      return(
        <div onLoad={searchProjectsUser}>
          <header>
            <Header></Header>
          </header>

          <body>
            <table >
                <thead>
                <tr>
                    <th>Task ID</th>
                    <th>Project ID</th>
                    <th>Name</th>
                    <th>Unit</th>
                    <th>Quantity</th>
                </tr>
                </thead>

                <tbody>
                {t.map(tasks => (
                <tr >
                    <td >{tasks.tasks_id}</td>
                    <td >{tasks.project_id}</td>
                    <td >{tasks.name}</td>
                    <td >{tasks.unit}</td>
                    <td >{tasks.quantity}</td>
                </tr>
                ))}
                </tbody>
              </table>
          </body>

        </div>
      )
    }
    
    }
  }


export default App;