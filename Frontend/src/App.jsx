import { useState } from "react";
import * as api from "./components/api";
import "./App.css";
import Header from "./components/header.jsx";

import Login from "./components/login.jsx"


function App() {
  
  const [p,setp]=useState([]);
  const [token, setToken] = useState(null)
  
  const [mode, setMode] = useState("login");
  

  const login = (token) => {

    setToken(token);
    localStorage.setItem("token", JSON.stringify(token));
    localStorage.setItem("userid",token.userid);
    
  };

  const setmodefn = (toggle) => {
    setMode(toggle);
  };

  
  
  

  
  const logout = () => {
    
    setToken(null);
  };

 

  const searchProjectsUser=async ()=> {
      
      const localToken= JSON.parse(localStorage.getItem("token"))
      const decodeToken=localToken.token.accessToken

      const projects=await api.getProjects(decodeToken)
      
      if (projects.success){
        const allProjects=projects.projects
        setp(allProjects)

        
      }
      else{return {message: 'We are sorry but something went wrong...'}}
  }


  if (token === null) {

    return <Login onLogin={login} onchangemode={setmodefn} />;}

  else{

    return (

      <div>
          <header>
            <Header onLogout={logout}/>
          </header>

          <body>
            Pulse aquí para buscar sus proyectos: 
              <button onClick={searchProjectsUser}>Aquí...  <br /></button> 
                
              <div>
                {p.map(p=>(
                  <tr>
                    <td>{p.name}</td>
                  </tr>
                ))}
              </div>
          </body>

          

          

      </div>


    )


    
    } 
}

export default App;

