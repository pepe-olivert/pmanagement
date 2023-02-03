import React from "react";
import "../styles/header.css";

function Header({onLogout}) {
  const logout= () => {
    
    
    onLogout(false);
  };
  return (
    <div>
      <div className="header">
        <div><img className="logo" src="/src/assets/logoaltum.png" alt="Logo" /></div>

        <h1 id="mirai">MIR.AI</h1>
        <span className="head">
          <p>
            La división de Software de{" "}
            <strong> Altum Proyectos de Ingeniería S.L.</strong>{" "}

            <button onClick={logout}>
              Logout
            </button>
          </p>
          
        </span>
      </div>
    </div>
  );
}

export default Header;