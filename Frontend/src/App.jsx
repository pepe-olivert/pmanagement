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

  const [mode, setMode] = useState("login");
  //const navigate = useNavigate();

  const login = (token) => {

    setToken(token);
    localStorage.setItem("token", JSON.stringify(token));
    localStorage.setItem("userid",token.userid);
    //navigate("/projects",{ replace: true });
  };

  const setmodefn = (toggle) => {
    setMode(toggle);
  };

  const gettasklen = (enddate, stratdate) => {
    var x = dayjs(enddate);
    var y = dayjs(stratdate);
    return x.diff(y, "days");
  };

  const addtask = (e) => {
    e.preventDefault();
    const newelem = {
      task: task,
      taskdesc: taskDesc,
      datein: datein,
      dateout: dateout,
      len: gettasklen(dateout, datein),
      bar:[] 
    };
    setelem((elem) => [...elem, newelem]);
    document.getElementById("form").reset();
    setdatein("");
    settask("");
  };

  const generategantt = () => {
    setgantt(!gantt);
  };

  const quit=(x)=> {
    setgantt(x);
  }


  if (token === null) {

    return <Login onLogin={login} onchangemode={setmodefn} />;}

  else{


    if (gantt) {
      return <Gantt props={elem} onquit={quit} />;
    } else {
      return (
        <div>
          <header>
            <Header />
          </header>
          <div className="tasks">
            <form id="form" onSubmit={addtask}>
              <h2>Task</h2>
              <input onChange={(e) => settask(e.target.value)} type="text" />
              <h2>Task Description</h2>
              <input onChange={(e) => settaskDesc(e.target.value)} type="text" />
              <h2>Date start</h2>
              <input onChange={(e) => setdatein(e.target.value)} type="Date" />
              <h2>Date end</h2>
              <input onChange={(e) => setdateout(e.target.value)} type="Date" />
              <button onClick={addtask}>Add Task</button>
            </form>
          </div>

          <div>
            <table>
              <tr>
                <th>Task</th>
                <th>Task Description</th>
                <th>Start Date</th>
                <th>End Date</th>
              </tr>
              {elem.map((item) => (
                <tr>
                  <td>{item.task}</td>
                  <td>{item.taskdesc}</td>
                  <td>{item.datein}</td>
                  <td>{item.dateout}</td>
                </tr>
              ))}
            </table>
          </div>

          <button on onClick={generategantt}>
            Generate Gantt
          </button>
        </div>
      );
    }
    } 
}

export default App;