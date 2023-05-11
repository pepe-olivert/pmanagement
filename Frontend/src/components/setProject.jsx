import React, { useState } from "react";
import Header from "./header.jsx";
import * as api from "./api";

function setProject ({onInfo, onRecieved}){

    const [projects_id, setProjectID] = useState("");
    const [p_class, setPClass] = useState("");
    const [p_name, setPName] = useState("");
    const [starting_date, setStartingDate] = useState(""); 
    const [ending_date, setEndingDate] = useState("");

    const info = ()=>{
        onInfo(false);
    }

    const addNewProject = async (e) =>  {
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
        info();
    }

    
    return (
        <div>
            <header>
                <Header/>
            </header>

            <div>
                <body>
                    <form id="form" onSubmit={addNewProject}>
                        <h2>Project Class</h2>
                        <input onChange={(e) => setPClass(e.target.value)} type="text"/>
                        <h2>Project Name</h2>
                        <input onChange={(e) => setPName(e.target.value)} type="text"/>
                        <h2>Starting Date</h2>
                        <input onChange={(e) => setStartingDate(e.target.value)} type="date"/>
                        <h2>Ending Date</h2>
                        <input onChange={(e) => setEndingDate(e.target.value)} type="date"/>
                        <br />
                        <button onClick={addNewProject}>New Project</button>
                    </form>
                    
                </body>
                <button onClick={info}>
                        Click to come back to see all your projects
                </button>
            </div>
        </div>
    )
}

export default setProject;