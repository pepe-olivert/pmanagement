import React, { useState, useEffect } from "react";
import Header from "./header.jsx";
import * as api from "./api";
import swal from 'sweetalert';
import "../styles/addTeamMembers.css";

function deleteTeamMembers ({onInfo, onRecieved}) {

    const [users,setUsers]=useState([]);
    const [projects_id,setProjectId]=useState(0);
    const [projects_name, setProjectsName] = useState("");

    useEffect(()=>{
        setProjectId(onRecieved[0]);
        setProjectsName(onRecieved[1]);
      }, [])

    const info = ()=>{
       onInfo(false);
    }

    const searchteambs =async ()=>{
        const members = await api.showTeamMembers2(projects_id)
        setUsers(members.members)
        
    }

    const addTeamMembers = async (e)=>{
        e.preventDefault()
        const values = Array
                .from(document.querySelectorAll('input[type="checkbox"]'))
                .filter((checkbox) => checkbox.checked)
                .map((checkbox) => checkbox.value);
        const request = {"array":values,"pid":projects_id}
        
        const added = await api.deleteTmb(request)
        
        info();
        
    }

    

    return(
        <div onLoad={searchteambs}>
            <header> 
                <Header/> 
            </header>
            <div >
            <button onClick={info} className="btn-back">
                    <span className="arrow"></span>
                    Return
                </button>
            </div>
            <body>

            <div>
                        <h2> Project's name</h2>
                        <p>{projects_name}</p>
            </div>

                <form id="form" onSubmit={addTeamMembers}>
                    <h2>Users</h2>
                <table >
              
                <thead>
                <tr>
                    <th scope="col">Email</th>
                    <th scope="col">User_id</th>
                    <th scope="col"></th>
                    
                </tr>
                </thead>

                <tbody>
                {users.map(users => (
                <tr >
                    <td >{users.users_id}</td>
                    <td >{users.email}</td>
                    <input type="checkbox" value={users.users_id}/>
                    
                    
                </tr>
                ))}
                </tbody>
              </table>
                    <br />
                    
                    <br />
                    
                    <br />

                <button>Click</button>
                    
                   
                </form>
            </body>
        </div>
    )



}

export default deleteTeamMembers;
/*
    

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

    
}

*/

