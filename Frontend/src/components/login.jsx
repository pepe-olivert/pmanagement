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
    <div class="container">
      <div class="screen">
        <div class="screen__content">
          <form class="login" onSubmit={submit}>
            <div class="login__field">
              <i class="login__icon fas fa-user"></i>
              <input type="text" class="login__input" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="User name / Email"/>
            </div>
            <div class="login__field">
              <i class="login__icon fas fa-lock"></i>
              <input type="password" class="login__input" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password"/>
            </div>
            <button class="button login__submit" onClick={submit}>
              <span class="button__text">Log In Now</span>
              <i class="button__icon fas fa-chevron-right"></i>
            </button>				
          </form>
          <div class="social-login">
            <h3>log in via</h3>
            <div class="social-icons">
              <a href="#" class="social-login__icon fab fa-instagram"></a>
              <a href="#" class="social-login__icon fab fa-facebook"></a>
              <a href="#" class="social-login__icon fab fa-twitter"></a>
            </div>
          </div>
        </div>
        <div class="screen__background">
          <span class="screen__background__shape screen__background__shape4"></span>
          <span class="screen__background__shape screen__background__shape3"></span>		
          <span class="screen__background__shape screen__background__shape2"></span>
          <span class="screen__background__shape screen__background__shape1"></span>
        </div>		
      </div>
    </div>
  );
}

export default Login;