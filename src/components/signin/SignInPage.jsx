import React, { useState} from "react";
import "../signin/SignIn_style.css";

import { handleLogin } from "../firebase/SignIn";
import { useDispatch} from "react-redux";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginError, setLoginError] = useState("");

  const dispatch = useDispatch();

  ///
  const onCancelClick = (e) => {
    e.preventDefault();

    dispatch({
      type: "UserLoginPageClose",
    });
  };

  // on Sign in or sign up button click
  const onloginClick = async (e) => {
    e.preventDefault();

    setEmailError("");
    setPasswordError("");
    setLoginError("");

    setEmail(() => email.trim());
    setPassword(() => password.trim());

    if ("" === email) {
      setEmailError("Please enter your email");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Please enter a valid email");
      return;
    }

    if ("" === password) {
      setPasswordError("Please enter a password");

      return;
    }

    if (password.length < 7) {
      setPasswordError("The password must be 8 characters or longer");

      return;
    }

    // Account login here
    const loginError = await handleLogin({ email, password });
    // console.log(loginError);
    loginError ? setLoginError("Wrong User Credentials") : (() => {})();
  };

  return (
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="form-group mt-3">
            <label>Email address: abcdefg@gmail.com</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && <p style={{ color: "red" }}>{emailError}</p>}
          </div>
          <div className="form-group mt-3">
            <label>Password: 12345678</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
          </div>
          <div className="d-flex justify-content-around gap-2 mt-3">
            <button
              type="submit"
              className="btn btn-warning"
              onClick={(e) => onCancelClick(e)}
            >
              close
            </button>
            <button
              type="submit"
              className="btn btn-success"
              onClick={(e) => onloginClick(e)}
            >
              Submit
            </button>
          </div>
          {loginError && <p style={{ color: "red" }}>{loginError}</p>}
        </div>
      </form>
    </div>
  );
};

export default SignInPage;
