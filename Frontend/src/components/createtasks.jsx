import React, { useState, useEffect} from "react";
import * as api from "./api";
import "../styles/createtasks.css";
import Header from "./header.jsx";


function creatasks({ontask,onInfo, onRecieved}){
    const [id,setid]=useState("");
    const [unit,setunit]=useState("");
    const [q,setq]=useState(null);
    const [name,setname]=useState("");
    const [item,setitem]= useState([]);
    const [perf,setperf]=useState([]);
    const [ic,setic]= useState(false);
    const [iu,setiu]= useState(false);
    const [cd,setcd]= useState(false);

    const [error,setError] = useState('');
    
    const info = ()=>{
        onInfo(false);
    }

    const comeback = ()=>{
        ontask(false)
    }

    const handleIC = ()=> {
        setic(!ic)
        
    }
    const handleIU = ()=> {
        setiu(!iu)
    }
    const handleCD = ()=> {
        setcd(!cd)
    }

    const addtask = async (e)=>{
        e.preventDefault();
        

        const perfiles1 = {
            1: iu,
            2: ic,
            3: cd
        }

        const selected = []
        const selected2 = []

        

        for (let clave in perfiles1){
            if (perfiles1[clave]=== true){selected2.push(clave)}
        }

        
        const datum = {
            "projects_id":id,
            "name":name,
            "unit":unit,
            "quantity":q

        }
        
        
        setitem((item => [...item, datum]));
        setperf((perf=> [...perf,selected2]))
        document.getElementById("form").reset()
        
        
    }

    
    const updatetasks = async (e)=>{
        
        try{
            e.preventDefault();
            const preupdated={
              "id":id
          }

            const created = await api.updatetask(item)
            const updated = await api.updateprojectstate(preupdated)
            const values = created.token
            for (let val in values){
                const task_id=values[val].rows[0].tasks_id
                const those = perf[val]
                those.forEach(async function(valor,index){
                    const toupdate={"tid":task_id,"pid":valor}
                    const updated= await api.updateP(toupdate)
                    
                    
                })
            }
            if (created.success && updated.success){
                swal({
                    title: "Tarea Creada",
                    icon:"success",
                    button: "Aceptar"
                });
                comeback();
            }
            else{return setError('No se ha podido subir la tarea'); }
        }catch(err){
            throw setError('No se ha podido subir la tarea');
        }
            

    }
    useEffect(()=>{
        setid(onRecieved[0]);
      }, [])
    
   
    

    return (
        <div >
            <header>
                <Header/>
            </header>
            <h1>WELCOME TO CREATE TASKS</h1> 

        <form onSubmit={addtask} id='form'>
            <div>
            Name   <input type="text" placeholder="Name" onChange={(e) => { setname(e.target.value) }}/>
            Unit   <input type="text" placeholder="Unit "onChange={(e) => { setunit(e.target.value) }}/>
            Quantity   <input type="number" placeholder="Quantity"onChange={(e) => { setq(e.target.value) }}/>
            </div>

            Profile assignment 
            
                <input type="checkbox" value="ic" checked={ic} onChange={handleIC}/>Ingeniero de caminos
                <input type="checkbox" value="iu" checked={iu} onChange={handleIU}/>Ingeniero industrial
                <input type="checkbox" value="cd" checked={cd} onChange={handleCD}/>Científico de datos
                
            
            
            <button >
                Pulsa para añadir la tarea al borrador de tareas
            </button>
            
            
        </form> 

        <h2>BORRADOR DE TAREAS</h2>
        <table >
                        <thead>


        
                        

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

        <div className="error">
            {error}
        </div>

        <button onClick={info}>
              Click to come back to see all your projects
        </button>

        </div>
    )
    
}


export default creatasks;