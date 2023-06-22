import { useEffect, useState } from "react";
import Header from "./header.jsx";
import * as api from "./api";

function Showtask({onInfo,onRecieved}) {

    const [q,setq]=useState("");
    const [d, setd] = useState("");
    const [sol, setsol] = useState("");

    useEffect(()=>{
        setq(onRecieved[4]);
      }, [])

    const op = async()=>{
        if(d>q){
            window.alert('El desglose no puede ser mayor que la cantidad')
        }else{
            const division = q/d;
            setsol(division);
        }
    }

    return(
        <div>
            <header>
                <Header></Header>
            </header>

            <body>
                <h2>Quantity: {q}</h2>

                <p>¿En cuánto quieres desglosar la cantidad?</p>

                <input onChange={(e) => { setd(e.target.value) }} type="number"/>
                <button onClick={op}>Confirmar</button>
                <p>Resultado: {sol}</p>
            </body>
        </div>
        
    )

}

export default Showtask;