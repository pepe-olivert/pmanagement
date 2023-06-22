import React, { useEffect, useState } from "react";
import Header from "./header.jsx";
import * as api from "./api";
import "../styles/newproject.css";


function setProject ({onInfo, onProject}){

    const [projects_id, setProjectID] = useState("");
    const [p_class, setPClass] = useState("");
    const [p_name, setPName] = useState("");
    const [starting_date, setStartingDate] = useState(""); 
    const [ending_date, setEndingDate] = useState("");
    const [p, setp] = useState(false); 

    const [error,setError] = useState('');


    const info = ()=>{
        onInfo(false);
     }

    const project = ()=>{
        onProject(false)
    }
    const difference = (a,b)=>{
        const date1utc = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
        const date2utc = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
        
        const day = 1000*60*60*24;
        return((date2utc - date1utc))/day
    }

    const addNewProject = async (e) =>  {
        try {
            e.preventDefault();
            const x= new Date(starting_date);
            const y= new Date(ending_date);
            
            const diff= difference(x,y)
            
            const values = {
                "p_class": p_class,
                "p_name": p_name,
                "starting_date": starting_date,
                "ending_date": ending_date,
                "users_id": localStorage.getItem('userid'),
                "projects_id": projects_id
            }

            if (diff >= 0){const newProject = await api.setProject(values);
                                
                                swal({
                                    text:"Se ha creado el proyecto",
                                    icon:"success",
                                    button: "Aceptar"
                                    });
                                document.getElementById("form").reset();
                                project();
                                info();}
            
            
            
            else{swal({
                title:'Oops!',
                text:"Ending date is smaller than the starting date :C",
                icon:"error",
                button: "Aceptar"
                });}
        } catch (error) {
            console.log(error)
            swal({
                title:'Oops!',
                text:"Something went wrong",
                icon:"error",
                button: "Aceptar"
                });
        }

    }
    
    

    

    
    return (
        <div>
            <header>
                <Header/>
            </header>
            
                
                <body>
                    <div >
                        <form onSubmit={addNewProject} id="form">
                            <h2>Project Class</h2>
                            <input onChange={(e) => setPClass(e.target.value)} type="text"/>
                            <h2>Project Name</h2>
                            <input onChange={(e) => setPName(e.target.value)} type="text"/>
                            <h2>Starting Date</h2>
                            <input onChange={(e) => setStartingDate(e.target.value)} type="date"/>
                            <h2>Ending Date</h2>
                            <input onChange={(e) => setEndingDate(e.target.value)} type="date"/>
                            <br />
                            <button className="btn-newproject2" onClick={addNewProject}>New Project</button>
                        </form>
                        <div>
                            <p>{error}</p>
                        </div>
                    </div>
                    <div>
                        <button onClick={info} className="btn-back">
                            <span className="arrow"></span>
                            Return
                        </button>
                    </div>
                </body>
        </div>
    )
}

export default setProject;