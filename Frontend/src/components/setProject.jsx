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

    const addNewProject = async (e) =>  {
        try {
            e.preventDefault();
            const values = {
                "p_class": p_class,
                "p_name": p_name,
                "starting_date": starting_date,
                "ending_date": ending_date,
                "users_id": localStorage.getItem('userid'),
                "projects_id": projects_id
            }
            const newProject = await api.setProject(values);
            document.getElementById("form").reset();
            swal({
                text:"Se ha creado el proyecto",
                icon:"success",
                button: "Aceptar"
                });
            project();
            info();
        } catch (error) {
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
                    <div className="form">
                        <form onSubmit={addNewProject}>
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