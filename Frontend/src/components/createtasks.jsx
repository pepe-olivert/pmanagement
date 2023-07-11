import React, { useState, useEffect} from "react";
import * as api from "./api";
import "../styles/createtasks.css";
import Header from "./header.jsx";


function creatasks({ontask,onInfo, onRecieved}){
    const [id,setid]=useState("");
    const [users,setUsers]=useState([]);
    const [unit,setunit]=useState("");
    const [q,setq]=useState(null);
    const [name,setname]=useState("");
    const [sdt,setsdt]=useState("");
    const [edt,setedt]=useState("");
    const [item,setitem]= useState([]);
    const [perf,setperf]=useState([]);
    const [tmb,settmb]=useState([]);
    const [ic,setic]= useState(false);
    const [iu,setiu]= useState(false);
    const [cd,setcd]= useState(false);
    const [sdp,setsdp]=useState("");
    const [edp,setedp]=useState("");
    const [icp,seticp]=useState("");
    const [iup,setiup]=useState("");
    const [cdp,setcdp]=useState("");


    const [error,setError] = useState('');
    
    const info = ()=>{
        onInfo(false);
    }

    const comeback = ()=>{
        ontask(false)
    }

    const handleIC = ()=> {
        setic(!ic)
        
    }
    const handleIU = ()=> {
        setiu(!iu)
    }
    const handleCD = ()=> {
        setcd(!cd)
    }

    const searchteambs =async ()=>{
        const members = await api.showTeamMembers()
        setUsers(members.members)
        
    }

    const difference = (a,b)=>{
        const date1utc = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
        const date2utc = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
        
        const day = 1000*60*60*24;
        return((date2utc - date1utc))/day
    }

    

    const addtask = async (e)=>{
        e.preventDefault();
        
        const x= new Date(sdp);
        const y= new Date(edp);
        const z = new Date(sdt)
        const w = new Date(edt)

        

        const diff= difference(x,z)
        const diff2= difference(y,z)
        const diff3= difference(x,w)
        const diff4= difference(y,w)
        const diff5 = difference(z,w)

        
        if (diff >= 0 && diff2<=0 && diff3>=0 && diff4 <= 0 && diff5 >=0){

        const perfiles1 = {
            1: iu,
            2: ic,
            3: cd
        }

        const performance = {
            1: iup,
            2: icp,
            3: cdp
        }

        const selected2 = []

        

        for (let clave in perfiles1){
            if (perfiles1[clave]=== true){selected2.push({"perfil":clave,"rend":performance[clave]})}
        }

        
        const datum = {
            "projects_id":id,
            "name":name,
            "unit":unit,
            "quantity":q,
            "sd":sdt,
            "ed":edt,

        }

        const v = Array
                .from(document.querySelectorAll('input[type="checkbox"][id="user_id"]'))
                .filter((checkbox) => checkbox.checked)
                .map((checkbox) => checkbox.value);

            

            
        const request = {"array":v}
        
        
        settmb((tmb => [...tmb, request]));
        setitem((item => [...item, datum]));
        setperf((perf=> [...perf,selected2]))
        document.getElementById("form").reset()

        }

        else{
            swal({
                title:'Oops!',
                text:"The date of this task is not in between the project duration.",
                icon:"error",
                button: "Aceptar"
                });
                document.getElementById("form").reset()
                const checked = document.getElementByTagName("check")
                checked.prop("checked", false);; 

                
        }
        
        
    }

    

    
    const updatetasks = async (e)=>{
        
        try{
            e.preventDefault();

            
            const preupdated={
              "id":id
          }

            const created = await api.updatetask(item)
            const updated = await api.updateprojectstate(preupdated)

            const values = created.token
            
           
            for (let val in values){
                const task_id=values[val].rows[0].tasks_id
                const those = perf[val]
                const memb = tmb[val].array
                
                
                those.forEach(async function(valor,index){
                    
                    const toupdate={"tid":task_id,"pid":valor.perfil,"rend":valor.rend}
                    const updated= await api.updateP(toupdate)
                    
                    
                    
                    
                })

                memb.forEach(async function(valor,index){
                    const toupdate2={"tid":task_id,"mid":memb[index]}
                    
                    const updated2= await api.addTmbtask(toupdate2)
                })

            
            
            }
            

            

            
            if (created.success && updated.success){
                swal({
                    title: "Tarea Creada",
                    icon:"success",
                    button: "Aceptar"
                });
                comeback();}

                else{return setError('No se ha podido subir la tarea'); }
            
            
            
        }catch(err){
            throw setError('No se ha podido subir la tarea');
        }
            

    }
    useEffect(()=>{
        setid(onRecieved[0]);
        setsdp(onRecieved[6])
        setedp(onRecieved[7])
      }, [])
    
   
    

    return (
        <div onLoad={searchteambs}>
            <header>
                <Header/>
            </header>
            <h1>WELCOME TO CREATE TASKS</h1> 

        <form onSubmit={addtask} id='form'>
            <div>
            Name   <input type="text" placeholder="Name" onChange={(e) => { setname(e.target.value) }}/>
            Unit   <input type="text" placeholder="Unit "onChange={(e) => { setunit(e.target.value) }}/>
            Quantity   <input type="number" placeholder="Quantity"onChange={(e) => { setq(e.target.value) }}/>
            Starting Date <input type="date" placeholder="Starting date"onChange={(e) => { setsdt(e.target.value) }}/>
            Ending Date<input type="date" placeholder="Ending Date"onChange={(e) => { setedt(e.target.value) }}/>
            
            <h2>Profile assignment</h2>
            </div>

           <section>

            <input type="checkbox" name = "check" value="ic" checked={ic} onChange={handleIC}/>Ingeniero de caminos
            <input type="number" placeholder="Performance" onChange={(e) => { seticp(e.target.value) }}/>
            </section>

            <section>

            <input type="checkbox"name = "check"value="iu" checked={iu} onChange={handleIU}/>Ingeniero industrial
            <input type="number" placeholder="Performance" onChange={(e) => { setiup(e.target.value) }}/>
            </section>

            <section>

            <input type="checkbox"name = "check" value="cd" checked={cd} onChange={handleCD}/>Científico de datos
            <input type="number" placeholder="Performance" onChange={(e) => { setcdp(e.target.value) }}/>
            </section>

            
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
                    <input type="checkbox" name = "check" id="user_id" value={users.users_id}/>
                    
                    
                </tr>
                ))}
                </tbody>
              </table>
                    <br />
                    
                    <br />
                    
                    <br />

                
                    
                   
               
                
                
                
            
            
            <button >
                Pulsa para añadir la tarea al borrador de tareas
            </button>
            
            
        </form> 

        <h2>BORRADOR DE TAREAS</h2>
        <table >
                        <thead>


        
                        

                        <tr>
                            <th scope="col">Project ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Unit</th>
                            <th scope="col">Quantity</th>
                            
                            
                        </tr>

                        </thead>
                        

                        
                        <tbody>
        
                    
                        {item.map(item => (

                        
            
                        <tr >
                            <td >{item.projects_id}</td>
                            <td >{item.name}</td>
                            <td >{item.unit}</td>
                            <td >{item.quantity}</td>
                            
                            
                        </tr>


            
                        ))}

                
            
                        </tbody>
            
        </table>

        <button onClick={updatetasks}>
                Pulsa para subir tus tareas
        </button>

        <div className="error">
            {error}
        </div>

        <button onClick={info}>
              Click to come back to see all your projects
        </button>

        </div>
    )
    
}


export default creatasks;