import React from "react";
import "../styles/header.css";

function Header({onLogout}) {

  const logout= () => {
    onLogout(false);
  };
  
  return (
    <div>
        <div className="logo">
          <img src="/src/assets/logoaltum.png" alt="Logo" />
          <h2 className="logo-nombre">MIR.AI</h2>
          <button onClick={logout} className="btn-logout">Logout</button>
        </div>        
    </div>
  );
}

export default Header;