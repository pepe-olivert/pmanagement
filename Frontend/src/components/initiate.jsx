import React, { useState, useEffect} from "react";
import * as api from "./api";
import "../styles/initiate.css";
import Header from "./header.jsx";


function initiate({oninitiate,onInfo, onRecieved}){
    const [id,setid]=useState("");

    
    const [pr,setpr]=useState("");
    const [pb,setpb]=useState(null);
    const [error, setError] = ("");
    const [m,setm]=useState("");

    
    const info = ()=>{
        onInfo(false);
    }

    const ini = ()=>{
        oninitiate(false)
    }

    const upd = async(e)=>{

        try {
            e.preventDefault();
            const toupdate={"id":id,"project_requirements":pr,"project_budget":pb,"milestones":m};
            const updated= await api.updateproject(toupdate)

            if (updated.success){
                swal({
                    text:"Se ha iniciado el proyecto",
                    icon:"success",
                    button: "Aceptar"
                });
                info();       
            }
            else{return setError('No se ha podido iniciar el proyecto');}
        } catch (error) {
            throw setError('No se ha podido iniciar el proyecto');
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
            <h1>WELCOME TO INITIATE</h1> 

        <form >

            
            Project Requirements   <input type="text" placeholder="Project Requirements "onChange={(e) => { setpr(e.target.value) }}/>
            Project Budget   <input type="number" placeholder="Project Budget"onChange={(e) => { setpb(e.target.value) }}/>

            Milestones   <input type="text" placeholder="Milestones"onChange={(e) => { setm(e.target.value) }}/>
            

            <button onClick={upd}>
              Click to initiate your project
            </button>
            
        </form> 

        <button onClick={info}>
              Click to come back to see all your projects
        </button>


        <div>{error}</div>


        </div>
    )
    
}

export default initiate;