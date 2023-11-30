import React, { useState, useEffect } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import Carousel from "./carousel.png";
import { useGoogleLogin } from "@react-oauth/google";

export default function Login() {
  const navigate = useNavigate();
  //formData state to track the form fields
  const [formData, setFormData] = useState({
    usernameOrEmail: "",
    password: "",
  });

  //handling the input and setting the values for each field
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  //State to handle when a input is focused (translates label up)
  const [focusedInputs, setFocusedInputs] = useState({
    usernameOrEmail: false,
    password: false,
  });

  //toggle input to be focused
  const handleFocus = (inputName) => {
    setFocusedInputs((prevFocusedInputs) => ({
      ...prevFocusedInputs,
      [inputName]: true,
    }));
  };

  //toggle input to be out of focus
  const handleBlur = (inputName) => {
    setFocusedInputs((prevFocusedInputs) => ({
      ...prevFocusedInputs,
      [inputName]: !!formData[inputName],
    }));
  };

  //post request to login
  const loginUser = async (e) => {
    e.preventDefault();

    const { usernameOrEmailOrEmail, password } = formData;

    try {
      const response = await axios.post("/login", formData);
      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        // Reset specific properties to empty strings
        setFormData({
          usernameOrEmailOrEmail: "",
          password: "",
        });

        localStorage.setItem("user", JSON.stringify(response.data));
        navigate("/success");
      }
    } catch (error) {
      console.log(error);
    }
  };

  //google SSO login
  const googleLogin = useGoogleLogin({
    onSuccess: () => {
      localStorage.clear();
      navigate("/success");
    },
  });

  return (
    <div className="auth-container">
      <div className="image-container" style={{ top: "auto" }}>
        <img src={Carousel} />
      </div>
      <div
        className="col-md-4"
        style={{
          marginRight: "",
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
              onSubmit={loginUser}
              action="https://preprlabs.org/login"
              acceptCharset="UTF-8"
              className="login-form form-horizontal"
              autoComplete="off"
              encType="multipart/form-data"
            >
              <div className="md-form cs-form">
                <input
                  type="text"
                  name="usernameOrEmail"
                  id="usernameOrEmail"
                  value={formData.usernameOrEmail}
                  className="form-control"
                  autoComplete="off"
                  onChange={handleInputChange}
                  onFocus={() => handleFocus("usernameOrEmail")}
                  onBlur={() => handleBlur("usernameOrEmail")}
                />
                <label
                  htmlFor="usernameOrEmail"
                  className={`${
                    focusedInputs["usernameOrEmail"] || formData.usernameOrEmail
                      ? "active"
                      : ""
                  }`}
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
              </div>
              <div className="md-form cs-form">
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={formData.password}
                  className="form-control"
                  autoComplete="false"
                  onChange={handleInputChange}
                  onFocus={() => handleFocus("password")}
                  onBlur={() => handleBlur("password")}
                />
                <label
                  htmlFor="password"
                  className={`${
                    focusedInputs["password"] || formData.password
                      ? "active"
                      : ""
                  }`}
                >
                  <span className="input-icon">
                    <img
                      src="https://d3f06rtlkr354b.cloudfront.net/public/front/img/password.png"
                      alt=""
                    />
                  </span>{" "}
                  Password{" "}
                </label>
              </div>
              <div className="md-form cs-form mt-3">
                <div className="forgt-pss-link">
                  <a href="#">Forgot Password?</a>
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
                  href="javascript:void(0)"
                  onClick={() => googleLogin()}
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
    </div>
  );
}
