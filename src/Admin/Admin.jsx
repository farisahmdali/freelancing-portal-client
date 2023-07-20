import React, { useContext, useEffect, useState } from "react";
import instance from "../axios/axios";
import cookies from 'js-cookies'
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    instance.get('/admin',{
      params:{
        email,
        password
      }
    }).then(res=>{
        cookies.setItem('token',res.data.token)
        navigate('/admin_panel',{replace:true});

    }).catch((res)=>{
        window.alert('username or password in incorrect')
    })
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2 className="form-title">Admin panel</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={handleEmailChange}
        className="auth-input"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={handlePasswordChange}
        className="auth-input"
      />
      <button type="submit" className="auth-button">
        Sign In
      </button>
      <p className="auth-link">Forgot password?</p>
    </form>
  );
};



const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  const handleToggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  const navigate = useNavigate()



  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className={`auth-card ${isSignUp ? "sign-up" : "sign-in"}`}>
            <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
