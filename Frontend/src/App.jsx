import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import Header from "./components/header.jsx";
import Gantt from "./components/gantt.jsx";
import dayjs from "dayjs";
import Login from "./components/login.jsx"

function App() {
  const [task, settask] = useState("");
  const [taskDesc, settaskDesc] = useState("");
  const [datein, setdatein] = useState("");
  const [dateout, setdateout] = useState("");
  const [elem, setelem] = useState([]);
  const [gantt, setgantt] = useState(false);

  const [token, setToken] = useState(null)
  const [program,setProgram] = useState(null)
  const [fullp,setfullp] = useState([]);
  const [mode, setMode] = useState("login");
  //const navigate = useNavigate();

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

 

  const searchProjects=()=> {
    
  }


  if (token === null) {

    return <Login onLogin={login} onchangemode={setmodefn} />;}

  else{

    return (

      <div>
          <header>
            <Header onLogout={logout}/>
          </header>

          

      </div>


    )


    
    } 
}

export default App;

