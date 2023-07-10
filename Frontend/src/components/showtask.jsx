import { useEffect, useState } from "react";
import Header from "./header.jsx";
import * as api from "./api";

function Showtask({onInfo,onRecieved}) {

    
    const [tid, settid] = useState("");
    
    const [taskinfo,settaskinfo]=useState([]);
    

    useEffect(()=>{
        settid(onRecieved[0])
        
      }, [])


    const info= () => {
        onInfo(false);
      };

    const logout = () => {
        setToken(null);
      };

      

    const tinfo = async ()=> {
        

        const item = await api.infotask(tid)
        const ids = item.item.pid
        const names = item.item.pname
        const rends = item.item.rends

        ids.forEach(function(ids,index){
            
            const datos = {"pid": ids.profiles_id,"pname":names[index][0].name,"rends":rends[index][0].rends}
            settaskinfo((taskinfo => [...taskinfo, datos]))


        })

      }


    
    


    return(
        <div onLoad={tinfo}>
            <header>
            <Header onLogout={logout}/>
            </header>


            <h2>TASK INFORMATION</h2>
        <table >
                        <thead>


        
                        

                        <tr>
                            <th scope="col">Task ID</th>
                            <th scope="col">Profile ID</th>
                            <th scope="col">Profiles Name</th>
                            <th scope="col">Performance</th>
                            
                        </tr>

                        </thead>
                        

                        
                        <tbody>
        
                    
                        {taskinfo.map(taskinfo => (

                        
            
                        <tr >
                            <td >{tid}</td>
                            <td >{taskinfo.pid}</td>
                            <td >{taskinfo.pname}</td>
                            <td >{taskinfo.rends}</td>
                            
                            
                            
                        </tr>


            
                        ))}

                
            
                        </tbody>
            
        </table>

            
            



            <button onClick={info}>
                Back
            </button>
           

            
        </div>
        
    )

}

export default Showtask;




//Da error


    /*
    setq(onRecieved[4]);
    const [q,setq]=useState("");
    const [d, setd] = useState("");
    const [sol, setsol] = useState("");
    
    
    const op = q / d;
    setsol(op);
    <body>
                <form>
                    <h2>Quantity: {q}</h2>

                    <p>¿En cuánto quieres desglosar la cantidad?</p>

                    <input onChange={(e) => { setd(e.target.value) }} type="number" />
                    <button type="submit">Confirmar</button>

                    <p>Resultado: {sol}</p>
                </form>
                
            </body>

    */