import React, { useState, useEffect} from "react";
import Header from "../components/header";
import "../styles/gantt.css";
import * as api from "../components/api";


function Gantt({onInfo,onRecieved}) {
  
  const [tasks,settasks]=useState([]);
  const [id,setid]=useState(0);


  const logout = () => {
    setToken(null);
  };

  const t = async ()=>{

    const listed =  await api.showTasks(id)
    
    
    if (listed.success){
      
      const tasks= listed.tasks
      
      settasks(tasks);
    }
    else{return {message:"No tasks identified"}}
  }

  useEffect(()=>{
    setid(onRecieved[0]);
  }, [])
 
  return (
    <div onLoad={t}>
      <header>
        <Header onLogout={logout}/>
      </header>
      <body className="gantt">
      <div className="sidebar">
        <h2>Tareas</h2>
        <div className="lista">
          <ul>
          {tasks.map(tasks => (

            <li>{tasks.name}</li>

          ))}
            
          </ul>
        </div>
        
      </div>

      <ul id="horizontal-list">
        <li>Mapeo de fechas</li>
      </ul>
      <ul>
        <li>Mapeo de tareas según fecha</li>
      </ul>
      </body>
    </div>
  );
}

export default Gantt;