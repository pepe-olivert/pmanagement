import React, { useState, useEffect} from "react";
import AddTeamMembers from "./addTeamMembers";
import Task from "./createtasks";
import Initiate from "./initiate";
import Showtask from "./showtask";
import Header from "../components/header";
import "../styles/showinfo.css";
import * as api from "../components/api";
import { format } from "date-fns";

//Onrecieved posee el nombre del proyecto
function showinfo ({onInfo,onRecieved})  {
    const [p,setp]=useState([]);
    const [name,setname]=useState("");
    const [clas,setclas]=useState("");
    const [requirement,setrequirement]=useState("");
    const [milestones,setmilestones]=useState([]);
    const [ed,seted]=useState("");
    const [budget,setbudget]=useState("");
    const [sd,setsd]=useState("");
    const [rol,setrol]=useState("");
    const [tasks,settasks]=useState([]);
    const [f,setf]=useState(false);
    const [aux,setaux]=useState([]);
    const [ini,setini]=useState(false)
    const [id,setid]=useState(null);
    const [task,settask]=useState(false);
    const [teamMembers, setTeamMembers] = useState(false);
    const [showtask, showTask] = useState(false);
    const [userid, setuserid]= useState("");


    const info= () => {
        onInfo(false);
      };

    const initiate=()=>{
      setini(!ini)
    }

    


    const ctask=()=>{
      
      settask(!task);
    }

    /*-----------PROJECT MANAGER FUNCTION---------------*/
    const t = async ()=>{
      
      
   
      const listed =  await api.showTasks(id)

      const ms = await api.showM(id)
      
      
      if (listed.success && ms.success){
        
        const tasks= listed.tasks
        const m = ms.tasks

        
        
        settasks(tasks);
        setmilestones(m);
      }
      else{return {message:"No tasks identified"}}
    }

    /*-----------TEAM MEMBER FUNCTION---------------*/

    const t2 = async ()=>{

      

      const ms = await api.showM(id)
      const taskids = await api.showtmbtasks(userid)

     
      
      
      if ( taskids.success && ms.success){
        
        const tasks = taskids.tasks
        const m = ms.tasks

        const tasks2 = []
        
        for (let t in tasks){
          tasks2.push(tasks[t][0])
        }
        console.log(tasks2)
        settasks(tasks2)
        setmilestones(m);
      }
      else{return {message:"No tasks identified"}}
    }


    const addTeamMembers = ()=> {
      setTeamMembers(!teamMembers);
    }

    const logout = () => {
      setToken(null);
    };

      useEffect(()=>{
        setname(onRecieved[1]);
        setclas(onRecieved[2]);
        setaux(onRecieved);
        setsd(onRecieved[6]);
        setrol(onRecieved[8]);
        setrequirement(onRecieved[4]);
        seted(onRecieved[7]);
        setbudget(onRecieved[5]);
        setid(onRecieved[0]);
        setuserid(onRecieved[9])
        setf(!f);
      }, [])


    if (rol !== "Team Member"){

      
          if (ini==true){return (
            <Initiate oninitiate={initiate} onInfo={info} onRecieved={onRecieved}/>)}

          else if (task===true){return (
            <Task ontask={ctask} onInfo={info} onRecieved={onRecieved}/>
          )}

          else if (teamMembers === true){
            return (
              <AddTeamMembers onTeamMember={addTeamMembers} onInfo={info} onRecieved={onRecieved} />
            )
            }
          
          else if(showtask === true){
            return (
              <Showtask onShowTask={showTask} onInfo={info} onRecieved={aux} />
            )
          }else{
                  return ( 

              
              <div onLoad={t} >


                <header>
                  <Header onLogout={logout}/>
                </header>
                
                  <table className="table-showinfo">
                    <tr>
                      <th>Project Name</th>
                      <th>Project Class</th>
                    
                      <th>Project Requirements</th>
                      <th>Project Budget</th>
                      
                    </tr>
                    <tr>
                      <td> {name}</td>
                      <td> {clas}</td>
                    
                      <td> {requirement}</td>
                      <td> {budget}</td>
                      
                    </tr>
                  </table>

                  <table >
                    <caption >Milestones</caption>
                      <thead>
                      <tr>
                          <th scope="col">Milestone ID</th>
                          <th scope="col">Project ID</th>
                          <th scope="col">Name</th>
                          <th scope="col">Date</th>
                          
                      </tr>
                      </thead>

                      <tbody>
                      {milestones.map(milestones => (
                      <tr >
                        <td >{milestones.m_id}</td>
                          <td >{milestones.project_id}</td>
                          <td >{milestones.nombre}</td>
                          <td >{format(new Date(milestones.sdate), "MMMM do, yyyy ")}</td>
                          
                      </tr>
                      ))}
                      </tbody>
                    </table>

                    <table >
                    <caption >Project Scope</caption>
                      <thead>
                      <tr>
                          <th scope="col">Task ID</th>
                          <th scope="col">Project ID</th>
                          <th scope="col">Name</th>
                          <th scope="col">Unit</th>
                          <th scope="col">Quantity</th>
                          <th scope="col">Starting Date</th>
                          <th scope="col">Ending Date</th>

                      </tr>
                      </thead>

                      <tbody>
                      {tasks.map(tasks => (
                      <tr >
                          <td>
                            <button className="btn-pname" onClick={()=>{const datos = 
                                [tasks.tasks_id, tasks.project_id, tasks.name, tasks.unit, tasks.quantity, tasks.profile, tasks.starting_date, tasks.ending_date, tasks.performance, tasks.tools];
                                setaux(datos);showTask(true);}}> {tasks.tasks_id}</button>
                          </td>
                          <td >{tasks.project_id}</td>
                          <td >{tasks.name}</td>
                          <td >{tasks.unit}</td>
                          <td >{tasks.quantity}</td>
                          <td >{format(new Date(tasks.starting_date), "MMMM do, yyyy ")}</td>
                          <td >{format(new Date(tasks.ending_date), "MMMM do, yyyy ")}</td>
                      </tr>
                      ))}
                      </tbody>
                    </table>

                  <div className="buttons">
                    <button onClick={initiate}>
                      Click to INITIATE YOUR PROJECT
                    </button>

                    <button onClick={ctask}>
                      Click to ADD TASKS to your project
                    </button>

                    <button onClick={addTeamMembers}>Add Team Members </button> 
                    
                    
                    <button onClick={info}>
                      Click to come back to see all your projects
                    </button>
                  </div>
              </div>

                  )
          }
      }


else {

  return (

    <div onLoad={t2} >


          <header>
            <Header onLogout={logout}/>
          </header>

          <div className="buttons">

          <table className="table-showinfo">
              <tr>
                <th>Project Name</th>
                <th>Project Class</th>
               
                <th>Project Requirements</th>
                <th>Project Budget</th>
                
              </tr>
              <tr>
                <td> {name}</td>
                <td> {clas}</td>
               
                <td> {requirement}</td>
                <td> {budget}</td>
                
              </tr>
            </table>

            <table >
              <caption >Milestones</caption>
                <thead>
                <tr>
                    <th scope="col">Milestone ID</th>
                    <th scope="col">Project ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Date</th>
                    
                </tr>
                </thead>

                <tbody>
                {milestones.map(milestones => (
                <tr >
                  <td >{milestones.m_id}</td>
                    <td >{milestones.project_id}</td>
                    <td >{milestones.nombre}</td>
                    <td >{format(new Date(milestones.sdate), "MMMM do, yyyy ")}</td>
                    
                </tr>
                ))}
                </tbody>
              </table>

              <table >
                    <caption >Project Scope</caption>
                      <thead>
                      <tr>
                          <th scope="col">Task ID</th>
                          <th scope="col">Project ID</th>
                          <th scope="col">Name</th>
                          <th scope="col">Unit</th>
                          <th scope="col">Quantity</th>
                          

                      </tr>
                      </thead>

                      <tbody>
                      {tasks.map(tasks => (
                      <tr >
                          <td>
                          {tasks.tasks_id}
                          </td>
                          <td >{tasks.project_id}</td>
                          <td >{tasks.name}</td>
                          <td >{tasks.unit}</td>
                          <td >{tasks.quantity}</td>
                          
                      </tr>
                      ))}
                      </tbody>
                    </table>
              
              
              <button onClick={info}>
                Click to come back to see all your projects
              </button>
          </div>

      </div>

  )
}

}

export default showinfo;