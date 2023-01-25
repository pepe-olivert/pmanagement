import "../assets/login.css";
import React, { useState } from "react";

import * as api from "./api";

const Login = ({ onLogin, onchangemode }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("register");
  const [message, setMessage] = useState(false);
  const [contentMessage, setContentMessage] = useState("");

  const login = async (userData) => {
    
    const { success, token, error } = await api.login(userData);
    setMessage(true);
    if (success) {
      onLogin(token);
      setContentMessage("Log In was successful!");
    } else {
      setContentMessage(error);
    }
    
    
  };

  

  const ContentMessage = () => (
    <p className="message_feedback">{contentMessage}</p>
  );

  const submit = (e) => {
    
    e.preventDefault();
    

    login({ email, password });
  };

  

  const togglemode = (e) => {
    e.preventDefault();
    setMode("register");
    onchangemode(mode);
  };

  return (
    <div className="container-initial">
      <form className="box-signin" onSubmit={submit}>
        <h1>Login</h1>
        <div>
          <p>Email</p>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <p>Password</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />


        </div>

        



        <button onClick={submit}>Sign Up</button>
        {message ? <ContentMessage /> : null}{" "}
        {/*As seen in https://stackoverflow.com/questions/24502898/show-or-hide-element-in-react*/}
      </form>
      

        
        
        
        
        

        

      
    </div>
  );
};
export default Login;