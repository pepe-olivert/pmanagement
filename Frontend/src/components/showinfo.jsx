import React, { useState, useEffect} from "react";

import Initiate from "./initiate.jsx"
import Task from "./createtasks.jsx"
import * as api from "./api.js";

import AddTeamMembers from "./addTeamMembers";
import Task from "./createtasks";


//Onrecieved posee el nombre del proyecto
function showinfo ({onInfo,onRecieved})  {
    const [name,setname]=useState("");
    const [clas,setclas]=useState("");

    const [tasks,settasks]=useState([]);
    
  
    const [f,setf]=useState(false);

    const [aux,setaux]=useState([]);
    const [ini,setini]=useState(false)
    const [id,setid]=useState("");
    const [task,settask]=useState(false);
    const [teamMembers, setTeamMembers] = useState(false);


    const info= () => {
        onInfo(false);
      };

    const initiate=()=>{
      setini(!ini)
    }


    const ctask=()=>{
      settask(!task)
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
    
    

      useEffect(()=>{
        setname(onRecieved[1]);
        setclas(onRecieved[2]);
        setaux(onRecieved)

        setid(onRecieved[0]);
        setf(!f);
      
      }, [])

      useEffect(()=>{
        
        if (id !== null){
          t();
        }
      
      }, [f])
  

      

    if (ini==true){return (
      <Initiate oninitiate={initiate} onInfo={info} onRecieved={onRecieved}/>
    )}

    else if (task===true){return (
      <Task ontask={ctask} onInfo={info} onRecieved={onRecieved}/>
    )


    }else if(teamMembers === true){
      return (
        <AddTeamMembers onTeamMember={addTeamMembers} onInfo={info} onRecieved={onRecieved} />
      )
  

    }
    else{
    return ( 

        


        
        <div onLoad={t}> 


          
            
          


           
            <table>
              <thead>
                <tr>
                  <th> Nombre </th>
                  <th> Clase </th>
                </tr>
              </thead>

              
              <tbody>
                <tr>
                  <td>{name}</td>
                  <td>{clas}</td>

                  <td>{id}</td>
                  

                  
                </tr>
              </tbody>
            </table>


            <table >
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
                          <td >{tasks.tasks_id}</td>
                            <td >{tasks.project_id}</td>
                            <td >{tasks.name}</td>
                            <td >{tasks.unit}</td>
                            <td >{tasks.quantity}</td>
                            
                            
                        </tr>


            
                        ))}

                
            
                        </tbody>
            
        </table>


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

      

    )
    }
}

export default showinfo;