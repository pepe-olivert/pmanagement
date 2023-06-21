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
    //Da error
    /*const op = q / d;
    setsol(op);*/

    return(
        <div>
            <header>
                <Header></Header>
            </header>

            <body>
                <form>
                    <h2>Quantity: {q}</h2>

                    <p>¿En cuánto quieres desglosar la cantidad?</p>

                    <input onChange={(e) => { setd(e.target.value) }} type="number" />
                    <button type="submit">Confirmar</button>

                    <p>Resultado: {sol}</p>
                </form>
                
            </body>
        </div>
        
    )

}

export default Showtask;