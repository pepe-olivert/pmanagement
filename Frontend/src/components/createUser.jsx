import React, { useEffect, useState } from "react";
import Header from "./header.jsx";
import * as api from "./api";

function createUser ({onInfo, onProject}){

    const [email, setemail] = useState("");
    const [pass, setpass] = useState("");
    const [rol, setrol] = useState("");

    const info = ()=>{
        onProject(false);
     };

    const addUser =async (e) => {
        e.preventDefault()
        const usuario = {"email":email,"password":pass,"rol":rol}
        const added = await api.register(usuario)
        
        info()
    }


    return (

        <div>
            <header>
                <Header/>
            </header>

            <body>

            <div >
                        <form onSubmit={addUser} id="form">
                            <h2>Username</h2>
                            <input onChange={(e) => setemail(e.target.value)} type="text"/>
                            <h2>Password</h2>
                            <input onChange={(e) => setpass(e.target.value)} type="text"/>
                            <h2>Rol</h2>
                            <input onChange={(e) => setrol(e.target.value)} type="text"/>
                            
                            <button className="btn-newproject2" onClick={addUser}>New User</button>
                        </form>
                        
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

export default createUser;


