import React, { useState, useEffect} from "react";
import AddTeamMembers from "./addTeamMembers";
import Task from "./createtasks";
import Initiate from "./initiate";
import Header from "../components/header";
import "../styles/showinfo.css";
import * as api from "../components/api";

//Onrecieved posee el nombre del proyecto
function showinfo ({onInfo,onRecieved})  {
    const [p,setp]=useState([]);
    const [name,setname]=useState("");
    const [clas,setclas]=useState("");
    const [requirement,setrequirement]=useState("");
    const [milestone,setmilestone]=useState("");
    const [budget,setbudget]=useState("");
    const [scope,setscope]=useState("");
    const [tasks,settasks]=useState([]);
    const [f,setf]=useState(false);
    const [aux,setaux]=useState([]);
    const [ini,setini]=useState(false)
    const [id,setid]=useState(null);
    const [task,settask]=useState(false);
    const [teamMembers, setTeamMembers] = useState(false);


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
      
      
      if (listed.success){
        
        const tasks= listed.tasks
        
        settasks(tasks);
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
        t();

      },[task])
    

      useEffect(()=>{
        setname(onRecieved[1]);
        setclas(onRecieved[2]);
        setaux(onRecieved)
        setscope(onRecieved[3])
        setrequirement(onRecieved[4])
        setmilestone(onRecieved[6])
        setbudget(onRecieved[5])
        setid(onRecieved[0]);
        setf(!f);
      
      }, [])

      useEffect(()=>{
        
        if (id !== null){
          t();
        }
      
      }, [f])

      /*const searchProjectsUser=async ()=> {
      
        const localToken= JSON.parse(localStorage.getItem("token"))
        const decodeToken=localToken.token.accessToken
        const projects=await api.getProjects(decodeToken)
        
        if (projects.success){
          const allProjects=projects.projects
          setp(allProjects)
        }
        else{return {message: 'We are sorry but something went wrong...'}}
      }*/

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
    
    else{
      

            return ( 

        
        <div onLoad={t} >


          <header>
            <Header onLogout={logout}/>
          </header>
           
            <table className="table-showinfo">
              <tr>
                <th>Project Name</th>
                <th>Project Class</th>
                <th>Project Scope</th>
                <th>Project Requirements</th>
                <th>Project Budget</th>
                <th>Milestones</th>

              </tr>
                    <tr>
                      <td> {name}</td>
                      <td> {clas}</td>
                      <td> {scope}</td>
                      <td> {requirement}</td>
                      <td> {budget}</td>
                      <td> {milestone}</td>
                    </tr>
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

export default showinfo;