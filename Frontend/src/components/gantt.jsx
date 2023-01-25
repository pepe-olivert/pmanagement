

import React from "react";

function Gant({ props ,onquit}) {
  console.log(props);

  const volver = () => {
    onquit(false);
  };

  return (
    <div>
      {" "}
      Tabla de tareas
      <table>
        {props.map((item) => (
          <tr>
            <td>{item.taskdesc}</td>
            <td>{item.len}</td>
          </tr>
        ))}
      </table>
      <div>
        <button onClick={volver}>Acabar</button>
      </div>
    </div>
  );
}

export default Gant;