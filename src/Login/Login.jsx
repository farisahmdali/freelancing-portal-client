import React, { useContext, useEffect, useState } from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import instance from "../axios/axios";
import cookies from 'js-cookies'
import { userData } from "../configs/userData";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()
  const val = useContext(userData);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    instance.post('/login',{
        username:email,
        password
    }).then(res=>{
        cookies.setItem('token',res.data.token)
        val.setUser(res.data.userDetail)
        navigate('/dashBoard',{replace:true});

    }).catch((res)=>{
        window.alert('username or password in incorrect')
    })
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2 className="form-title">Welcome Back</h2>

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

const SignUpForm = () => {
  const [res, setRes] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 const val = useContext(userData);
  const navigate = useNavigate()

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(email&&password){
        instance.post('/register',{
            key:process.env.REACT_APP_KEY,
            cred:email.cred,
            password
        }).then(res=>{
            cookies.setItem('token',res.data.token)
            val.setUser(res.data.result)
            navigate('/dashBoard',{replace:true});
        })
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2 className="form-title">Create an Account</h2>
      <div className=" mb-2  w-100">
        {email ? <input
        type="email"
        placeholder="Email"
        value={email.email}
        className="auth-input"
      />:
        <GoogleOAuthProvider clientId="992852730562-mmbfql25sfup3qc8188oh1btn6sqerm9.apps.googleusercontent.com">
          <GoogleLogin
            useOneTap
            context="signup"
            text="signup_with"
            onSuccess={async (e) => {
                console.log(e)
              instance.post('/checkUsername',{
                cred:e.credential
              }).then(res=>{
                console.log(res.data)
                if(res.data==='user exist'){
                    window.alert('user Already exist please any other account')
                }else{
                    setEmail({email:res.data,cred:e.credential});
                }
              })
            }}
            onError={() => {
              window.alert("something went wrong");
            }}
          />
        </GoogleOAuthProvider>}
      </div>
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={handlePasswordChange}
        minLength={6}
        className="auth-input"
      />
      <button type="submit" className="auth-button">
        Sign Up
      </button>
    </form>
  );
};

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const val = useContext(userData);

  const handleToggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  const navigate = useNavigate()


useEffect(()=>{
    instance.post('/login',{
        token:cookies.getItem('token')
    }).then(res=>{
        val.setUser(res.data.userDetail)
        navigate('/dashBoard',{replace:true});

    }).catch((res)=>{
        cookies.removeItem('token')
    })
},[])
  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className={`auth-card ${isSignUp ? "sign-up" : "sign-in"}`}>
          {isSignUp ? <SignUpForm /> : <LoginForm />}
          <p className="auth-toggle" onClick={handleToggleForm}>
            {isSignUp
              ? "Already have an account? Sign In"
              : "Don't have an account? Sign Up"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
