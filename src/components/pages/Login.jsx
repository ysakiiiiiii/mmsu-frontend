// Final Login.jsx with integrated UI and maintained AuthContext and backend functionality

import React, { useContext, useReducer, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../auth/AuthWrapper";
import ConfirmationModal from "../common/ConfirmationModal";
import Tooltip from "../common/tooltip";
import "../structure/Login/login_styles.css";

export function Login() {
  const { login, signup, switchToSignup, switchToLogin, isSignup } =
    useContext(AuthContext);

  const navigate = useNavigate();

  const [formData, setFormData] = useReducer(
    (formData, newItem) => ({ ...formData, ...newItem }),
    { username: "", email: "", password: "", repeatPassword: "" }
  );

  const [errorMessage, setErrorMessage] = useState(null);
  const [modal, setModal] = useState({ isOpen: false, type: null });

  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    if (errorMessage) {
      setShowTooltip(true);
    }
  }, [errorMessage]);

  const handleTooltipClose = () => {
    setShowTooltip(false);
    setErrorMessage(null);
  };

  const showModal = (type) => {
    setModal({ isOpen: true, type });
    setTimeout(() => {
      setModal({ isOpen: false, type: null });
    }, 3000);
  };

  useEffect(() => {
    const container = document.getElementById("login-container");
    if (isSignup) {
      container?.classList.add("right-panel-active");
    } else {
      container?.classList.remove("right-panel-active");
    }

    // Clear input fields and errors on form switch
    setFormData({ username: "", email: "", password: "", repeatPassword: "" });
    setErrorMessage(null);
    setShowTooltip(false);
  }, [isSignup, setFormData]);

  const doLogin = async () => {
    try {
      await login(formData.username, formData.password);
      showModal("login");

      setTimeout(() => {
        formData.username === "admin" ? navigate("/admin") : navigate("/");
      }, 1000);
    } catch (error) {
      setErrorMessage(error);
    }
  };

  const doSignup = async () => {
    try {
      await signup(
        formData.username,
        formData.email,
        formData.password,
        formData.repeatPassword
      );
      showModal("signup");

      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      setErrorMessage(error);
    }
  };

  useEffect(() => {
    const container = document.getElementById("login-container");
    if (isSignup) {
      container?.classList.add("right-panel-active");
    } else {
      container?.classList.remove("right-panel-active");
    }
  }, [isSignup]);

  return (
    <div className="login-wrapper">
      <div className="toggle-buttons">
        <button
          className={!isSignup ? "active" : ""}
          onClick={switchToLogin}
          type="button"
        >
          Sign In
        </button>
        <button
          className={isSignup ? "active" : ""}
          onClick={switchToSignup}
          type="button"
        >
          Sign Up
        </button>
      </div>

      <div id="login-container" className="login-container font-Poppins">
        <ConfirmationModal
          isOpen={modal.isOpen}
          type={modal.type}
          onClose={() => setModal({ isOpen: false, type: null })}
        />

        {/* Signup Form */}
        <div className="form-container sign-up-container">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              doSignup();
            }}
          >
            <h1 className="font-bold pb-2.5 text-xl">Create Account</h1>
            <span className="text-sm">Fill up the necessay fields</span>

            <input
              id="login-input"
              type="text"
              placeholder="Username"
              value={formData.username}
              onChange={(e) => setFormData({ username: e.target.value })}
              required
            />
            <input
              id="login-input"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ email: e.target.value })}
              required
            />
            <input
              id="login-input"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ password: e.target.value })}
              required
            />
            <input
              id="login-input"
              type="password"
              placeholder="Repeat Password"
              value={formData.repeatPassword}
              onChange={(e) => setFormData({ repeatPassword: e.target.value })}
              required
            />
            {showTooltip && errorMessage && (
              <Tooltip
                message={errorMessage.message}
                onClose={handleTooltipClose}
                position={{ top: "20px", right: "" }}
              />
            )}

            <button id="login-button" type="submit" className="mt-4">
              Sign Up
            </button>
          </form>
        </div>

        {/* Login Form */}
        <div className="form-container sign-in-container">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              doLogin();
            }}
          >
            <h1 className="font-bold pb-2.5 text-xl">Sign in</h1>
            <span className="text-sm">Fill out to enjoy shopping</span>
            <input
              id="login-input"
              type="text"
              placeholder="Username"
              value={formData.username}
              onChange={(e) => setFormData({ username: e.target.value })}
              required
            />
            <input
              id="login-input"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ password: e.target.value })}
              required
            />
            <a href="#" className="p-4">
              Forgot your password?
            </a>
            {showTooltip && errorMessage && (
              <Tooltip
                message={errorMessage.message}
                onClose={handleTooltipClose}
                position={{ top: "50px", right: "" }}
              />
            )}

            <button id="login-button" type="submit">
              Sign In
            </button>
          </form>
        </div>

        {/* Overlay */}
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1 className="font-Montserrat-ExtraBold text-4xl pb-4">
                Welcome Back!
              </h1>
              <p>
                {" "}
                To keep connected with us please login with your personal info{" "}
              </p>
              <button
                type="button"
                id="login-button"
                className="ghost mt-5"
                onClick={switchToLogin}
              >
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1 className="font-Montserrat-ExtraBold text-4xl pb-4">
                Hello, Friend!
              </h1>
              <p>Choose your fashion style and start shopping with us</p>
              <button
                type="button"
                id="login-button"
                className="ghost mt-5"
                onClick={switchToSignup}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
