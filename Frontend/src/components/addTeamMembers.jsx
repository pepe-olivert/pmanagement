import React, { useState, useEffect } from "react";
import Header from "./header.jsx";
import * as api from "./api";
import swal from 'sweetalert';

function addTeamMembers ({onInfo, onRecieved}) {

    const [users,setUsers]=useState([]);
    const [projects, setProjects] = useState([]);
    const [rol, setRol] = useState("");
    const [users_id, setUserId] = useState(0);
    const [projects_id,setProjectId]=useState(0);
    const [projects_name, setProjectsName] = useState("");

    const [error,setError] = useState('');

    // método que carga las llamadas a la base de datos automáticamente
    const methodOnLoad=async ()=> {
      
        const localToken= JSON.parse(localStorage.getItem("token"))
        const decodeToken=localToken.token.accessToken
  
        const projects=await api.getProjects(decodeToken)
        
        if (projects.success){
          const allProjects=projects.projects
          setProjects(allProjects)
        }
        else{return {message: 'We are sorry but something went wrong...'}}

        const users=await api.getUsers()
        
        if (users.success){
          const allUsers=users.users
          setUsers(allUsers)
        }
        else{
            return setError('No existe el usuario');
        }
    }

    useEffect(()=>{
        setProjectId(onRecieved[0]);
        setProjectsName(onRecieved[1]);
      }, [])

    const info = ()=>{
       onInfo(false);
    }

    const addTeamMembers = async (e) =>  {
        try {
            e.preventDefault();
            const values = {
                "users_id": users_id,
                "projects_id": projects_id,
                "rol": rol
            }
            const newTeamMember = await api.setTeamMember(values);
            swal({
                text:"Se ha cambiado el Rol al Usuario",
                icon:"success",
                button: "Aceptar"
              });
            info();
        } catch (error) {
            console.log(error);
        }
        
    }

    return(
        <div onLoad={methodOnLoad}>
            <header> 
                <Header/> 
            </header>

            <body>
                <form id="form" onSubmit={addTeamMembers}>
                    <label>Users: </label>
                    <div>
                        <select onChange={(e) => setUserId(e.target.value)} >
                            {users.map((option) => (
                                <option value={option.users_id}>{option.email}</option>
                            ))}
                            
                        </select>
                    </div> 
                    <br />
                    <label> Project's name: <p>{projects_name}</p> </label>
                    
                    <div>
                        <label>Rol: </label>
                        <select id="rol" onChange={(e) => setRol(e.target.value)}>
                            <option value="Program Manager">Program Manager</option>
                            <option value="Project Manager">Project Manager</option>
                            <option value="Team Member">Team Member</option>
                        </select>
                    </div>
                    <br />
                    <button onClick={addTeamMembers}>Add Team Member</button>
                    <div>
                        <p>{error}</p>
                    </div>
                </form>
            </body>
        </div>
    )
}

export default addTeamMembers;