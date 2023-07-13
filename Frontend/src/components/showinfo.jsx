import React, { useState, useEffect} from "react";
import AddTeamMembers from "./addTeamMembers";
import Gantt from "./gantt";
import Task from "./createtasks";
import Initiate from "./initiate";
import Showtask from "./showtask";
import Header from "../components/header";
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
    const [tasks,settasks]=useState([]);
    const [f,setf]=useState(false);
    const [aux,setaux]=useState([]);
    const [gantt,setGantt]=useState([]);
    const [ini,setini]=useState(false)
    const [id,setid]=useState(null);
    const [task,settask]=useState(false);
    const [teamMembers, setTeamMembers] = useState(false);
    const [showtask, showTask] = useState(false);
    const [showgantt, showGantt] = useState(false);

    const info= () => {
        onInfo(false);
      };

    const initiate=()=>{
      setini(!ini)
    }

    const ctask=()=>{
      
      settask(!task);
    }


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
        setrequirement(onRecieved[4]);
        seted(onRecieved[7]);
        setbudget(onRecieved[5]);
        setid(onRecieved[0]);
        setf(!f);
      
      }, [])

      

      
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
    else if (showgantt === true){
      return (
        <Gantt onGantt={showGantt} onInfo={info} onRecieved={gantt} />
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
                </tr>
                ))}
                </tbody>
              </table>

            <div className="buttons">
              <button onClick={initiate}>
                Initiate Your Project
              </button>

              <button onClick={ctask}>
                Add Tasks To Your Project
              </button>

              {tasks.map(tasks => (
                <button onClick={()=>{const datos = 
                      [tasks.tasks_id];setGantt(datos);showGantt(true);}}>
                Gantt
              </button>
              ))}

              <button onClick={addTeamMembers}>
                Add Team Members 
              </button> 

              <button onClick={info}>
                Come back to see all your projects
              </button>
            </div>
        </div>

            )
    }
}

export default showinfo;