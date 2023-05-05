import React, { useState, useEffect} from "react";
import * as api from "./api";


function creatasks({ontask,onInfo, onRecieved}){
    const [id,setid]=useState("");
    const [unit,setunit]=useState("");
    const [q,setq]=useState(null);
    const [name,setname]=useState("");
    const [item,setitem]= useState([]);
    
    const info = ()=>{
        onInfo(false);
    }

    const comeback = ()=>{
        ontask(false)
    }

    const addtask = async (e)=>{
        e.preventDefault();
        const datum = {
            "projects_id":id,
            "name":name,
            "unit":unit,
            "quantity":q

        }

        setitem((item => [...item, datum]));
        document.getElementById("form").reset()
    }
    const updatetasks = async (e)=>{
        e.preventDefault();

        const preupdated={
            "id":id
        }
        const created = await api.updatetask(item)
        const updated = await api.updateprojectstate(preupdated)
        if (created.success && updated.success){

        const created = await api.updatetask(item)
        if (created.success){

            
            info()
            
    
            
          }
          else{return {message: 'We are sorry but something went wrong...'}}
    
    }


    

    useEffect(()=>{
        setid(onRecieved[0]);
      }, [])
    
   
    

    return (
        <div >
            <h1>WELCOME TO CREATE TASKS</h1> 

        <form onSubmit={addtask} id='form'>
            Name   <input type="text" placeholder="Name" onChange={(e) => { setname(e.target.value) }}/>
            Unit   <input type="text" placeholder="Unit "onChange={(e) => { setunit(e.target.value) }}/>
            Quantity   <input type="number" placeholder="Quantity"onChange={(e) => { setq(e.target.value) }}/>
            
            
            <button >
                Pulsa para añadir la tarea al borrador de tareas
            </button>
            
            
        </form> 

        <h2>BORRADOR DE TAREAS</h2>
        <table >
                        <thead>


        <table BORRADOR DE TAREAS>
                        

                        <tr>
                            <th scope="col">Project ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Unit</th>
                            <th scope="col">Quantity</th>
                            
                        </tr>

                        </thead>
                        

                        
                        <tbody>
        
                    
                        {item.map(item => (

                        
            
                        <tr >
                            <td >{item.projects_id}</td>
                            <td >{item.name}</td>
                            <td >{item.unit}</td>
                            <td >{item.quantity}</td>
                            
                            
                        </tr>


            
                        ))}

                
            
                        </tbody>
            
        </table>

        <button onClick={updatetasks}>
                Pulsa para subir tus tareas
        </button>

        <button onClick={info}>
              Click to come back to see all your projects
        </button>

        </div>
    )
    
}

export default creatasks;