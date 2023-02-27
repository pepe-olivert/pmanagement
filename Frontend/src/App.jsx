import { useEffect, useState } from "react";
import * as api from "./components/api";
import "./App.css";
import Header from "./components/header.jsx";

import Login from "./components/login.jsx"
import Showinfo from "./components/showinfo.jsx"

function App() {
  
  const [p,setp]=useState([]);
  const [token, setToken] = useState(null)
  const [info,setinfo]= useState(false)
  const [mode, setMode] = useState("login");
  const [aux, setaux] = useState([]);
  
  
  const login = (token) => {
    setToken(token);
    localStorage.setItem("token", JSON.stringify(token));
    localStorage.setItem("userid",token.userid);
  };

  const setmodefn = (toggle) => {
    setMode(toggle);
  };

  

  const comingbackinfo= ()=>{
    setinfo(false)
  }

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
    if (info===true){return <Showinfo onInfo={comingbackinfo} onRecieved={aux}/>}
    else{

    return (

      <div onLoad={searchProjectsUser}>
          <header>
            <Header onLogout={logout}/>
          </header>

          <body>
            
              
              <div>
                {p.map(p=>(
                  <tr>
                    <td><button onClick={()=>{const datum = [p.projects_id,p.name,p.class]; setaux(datum);setinfo(true)}}> {p.name}</button></td>
                    <td> {p.class}</td>
                    <td> {p.projects_id}</td>
                    
                  </tr>
                ))}
              </div>
          </body>

          

          

      </div>


    )

                }
    
    } 
}

export default App;

