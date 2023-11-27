import React, { useState, useEffect } from "react";
import "../Login/login.css";
import { Link } from "react-router-dom";

export default function Login() {
  //Created States, to handle the label moving up and down on focus/blur and also tracking the value of the username and password
  const [password, setPassword] = useState("");

  const [user, setUser] = useState("");
  const [userFocus, setUserFocus] = useState(false);
  const [passFocus, setPassFocus] = useState(false);

  const handleUserChange = (event) => {
    setUser(event.target.value);
  };
  const handlePassChange = (event) => {
    setPassword(event.target.value);
  };

  const userFocusHandler = () => {
    setUserFocus(true);
  };

  const userBlurHandler = () => {
    setUserFocus(false);
  };

  const passFocusHandler = () => {
    setPassFocus(true);
  };

  const passBlurHandler = () => {
    setPassFocus(false);
  };

  return (
    <div
      className="col-md-4 offset-md-7"
      style={{
        marginLeft: "0.333333%!important",
        paddingLeft: "18px!important",
      }}
    >
      <div className="card login-card mt-5">
        <div className="card-header bg-white text-center">
          <div className="login-logo p-10">
            <a href="https://preprlabs.org/explore">
              <img
                src="https://d3f06rtlkr354b.cloudfront.net/public/front/img/logoNew.png"
                alt=""
              />
            </a>
          </div>
        </div>
        <div className="card-body">
          <form
            method="POST"
            action="https://preprlabs.org/login"
            acceptCharset="UTF-8"
            className="login-form form-horizontal"
            autoComplete="off"
            encType="multipart/form-data"
          >
            <input
              name="_token"
              type="hidden"
              defaultValue="BGk6lKkLhxJz1Jpe5oIFsHe3RvOX5rgc8Md08HrS"
            />
            <input
              type="hidden"
              name="_token"
              defaultValue="BGk6lKkLhxJz1Jpe5oIFsHe3RvOX5rgc8Md08HrS"
            />{" "}
            <div className="md-form cs-form">
              <input
                type="text"
                name="username"
                id="username"
                value={user}
                className="form-control"
                autoComplete="off"
                onChange={handleUserChange}
                onFocus={userFocusHandler}
                onBlur={userBlurHandler}
              />
              <label
                htmlFor="username"
                className={`${userFocus || user ? "active" : ""}`}
              >
                {" "}
                <span className="input-icon">
                  <img
                    src="https://d3f06rtlkr354b.cloudfront.net/public/front/img/user.png"
                    alt=""
                  />
                </span>{" "}
                User name or email
              </label>
              <span className="text-left help-block text-red" />
            </div>
            <div className="md-form cs-form">
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                className="form-control"
                autoComplete="false"
                onChange={handlePassChange}
                onFocus={passFocusHandler}
                onBlur={passBlurHandler}
              />
              <label
                htmlFor="password"
                className={`${passFocus || password ? "active" : ""}`}
              >
                <span className="input-icon">
                  <img
                    src="https://d3f06rtlkr354b.cloudfront.net/public/front/img/password.png"
                    alt=""
                  />
                </span>{" "}
                Password{" "}
              </label>
              <span className="text-left help-block text-red" />
            </div>
            <div className="clearfix"></div>
            <div className="md-form cs-form mt-3">
              <div className="forgt-pss-link">
                <a href="https://preprlabs.org/password/reset">
                  Forgot Password?
                </a>
              </div>
            </div>
            <div className="text-center mt-3">
              <button
                className="btn btn-warning btn-block waves-effect waves-light"
                type="submit"
              >
                Log in
              </button>
            </div>
            <div className="text-center or">
              <p>or</p>
            </div>
            <div className="m-b-5">
              <a
                href="https://preprlabs.org/login/google"
                className="btn  btn-danger btn-block waves-effect waves-light"
              >
                Continue with Google
              </a>
            </div>
          </form>

          <div className="text-center m-t-8 m-b-5 f-s-14">
            Don't have an account?{" "}
            <Link to="/signup" className="text-light-green">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
