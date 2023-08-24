import React, { useContext, useEffect, useState } from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import instance from "../axios/axios";
import cookies from "js-cookies";
import { userData } from "../configs/userData";
import { useNavigate } from "react-router-dom";
import "../Home/home.css";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [changePassword, setChangePassword] = useState("");
  const [forgot, setForgot] = useState();
  const [otp, setOtp] = useState("");
  const [customAlert, setCustomeAlert] = useState(false);
  const navigate = useNavigate();
  const val = useContext(userData);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    instance
      .post("/login", {
        username: email,
        password,
      })
      .then((res) => {
        cookies.setItem("token", res.data.token);
        val.setUser(res.data.userDetail);
        navigate("/dashBoard", { replace: true });
      })
      .catch((res) => {
        setCustomeAlert("username or password in incorrect");
      });
  };

  return (
    <>
      {customAlert ? (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline">{customAlert}</span>
          
        </div>
      ) : null}
      {forgot ? (
        <>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
            className="auth-input"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded auth-button"
            onClick={() => {
              instance.post("/sendOtpGmail", {
                email,
              });
            }}
          >
            Send OTP
          </button>
          <input
            type="number"
            placeholder="OTP"
            onChange={(e) => setOtp(e.target.value)}
            className="auth-input"
          />
          <input
            type="text"
            placeholder="New Password"
            value={changePassword}
            onChange={(e) => setChangePassword(e.target.value)}
            className="auth-input"
          />

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded auth-button"
            onClick={() => {
              instance
                .post("/changePassword", {
                  email,
                  otp,
                  password: changePassword,
                })
                .then(() => {
                  window.location.reload();
                })
                .catch(() => {
                  setCustomeAlert("some thing wrong");
                });
            }}
          >
            Submit
          </button>
        </>
      ) : (
        <>
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
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded auth-button"
            >
              Sign In
            </button>
            <p className="auth-link" onClick={() => {setForgot(true)
            setCustomeAlert(false)}}>
              Forgot password?
            </p>

            <div className="flex flex-col justify-center pb-1 items-center w-full">
              <GoogleOAuthProvider clientId="992852730562-mmbfql25sfup3qc8188oh1btn6sqerm9.apps.googleusercontent.com">
                <GoogleLogin
                  useOneTap
                  context="signup"
                  text="signup_with"
                  onSuccess={async (e) => {
                    console.log(e);
                    instance
                      .post("/login", {
                        cred: e.credential,
                      })
                      .then((res) => {
                        cookies.setItem("token", res.data.token);
                        val.setUser(res.data.userDetail);
                        navigate("/dashBoard", { replace: true });
                      })
                      .catch((err) => {
                        setCustomeAlert("Please sign up");
                      });
                  }}
                  onError={() => {
                    setCustomeAlert("something went wrong");
                  }}
                />
              </GoogleOAuthProvider>
            </div>
          </form>
        </>
      )}
    </>
  );
};

const SignUpForm = () => {
  const [res, setRes] = useState("");
  const [customAlert, setCustomeAlert] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const val = useContext(userData);
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      instance
        .post("/register", {
          key: process.env.REACT_APP_KEY,
          cred: email.cred,
          password,
        })
        .then((res) => {
          cookies.setItem("token", res.data.token);
          val.setUser(res.data.result);
          navigate("/dashBoard", { replace: true });
        });
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      {customAlert ? (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline">{customAlert}</span>
        </div>
      ) : null}
      <h2 className="form-title">Create an Account</h2>
      <div className=" mb-2  w-100">
        {email ? (
          <input
            type="email"
            placeholder="Email"
            value={email.email}
            className="auth-input"
          />
        ) : (
          <GoogleOAuthProvider clientId="992852730562-mmbfql25sfup3qc8188oh1btn6sqerm9.apps.googleusercontent.com">
            <GoogleLogin
              useOneTap
              context="signup"
              text="signup_with"
              onSuccess={async (e) => {
                console.log(e);
                instance
                  .post("/checkUsername", {
                    cred: e.credential,
                  })
                  .then((res) => {
                    console.log(res.data);
                    if (res.data === "user exist") {
                      setCustomeAlert(
                        "user Already exist please any other account"
                      );
                    } else {
                      setEmail({ email: res.data, cred: e.credential });
                    }
                  });
              }}
              onError={() => {
                setCustomeAlert("something went wrong");
              }}
            />
          </GoogleOAuthProvider>
        )}
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

  const navigate = useNavigate();

  useEffect(() => {
    instance
      .post("/login")
      .then((res) => {
        val.setUser(res.data.userDetail);
        navigate("/dashBoard", { replace: true });
      })
      .catch((res) => {
        cookies.removeItem("token");
      });
  }, []);
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
