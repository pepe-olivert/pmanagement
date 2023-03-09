import React, { useState, useEffect} from "react";
import AddTeamMembers from "./addTeamMembers";

//Onrecieved posee el nombre del proyecto
function showinfo ({onInfo,onRecieved})  {
    const [name,setname]=useState("");
    const [clas,setclas]=useState("");
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

    const addTeamMembers = ()=> {
      setTeamMembers(!teamMembers);
    }
    
    
      useEffect(()=>{
        setname(onRecieved[1]);
        setclas(onRecieved[2]);
        setaux(onRecieved)
        setid(onRecieved[0])
      
      }, [])

    
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

        
        <div >



           
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
                  
                </tr>
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