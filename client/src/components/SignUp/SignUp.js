import React, { useState } from "react";
import "./signup.css";
import PasswordChecklist from "react-password-checklist";
import PasswordStrengthBar from "react-password-strength-bar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import Carousel from "../Login/carousel.png";
import ReCAPTCHA from "react-google-recaptcha";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import Select from "react-select";
import { useGoogleLogin } from "@react-oauth/google";

export default function SignUp() {
  //for the select drop down for UserTypes
  const userTypeOptions = [
    { value: "", label: "User type" },
    { value: "Learner", label: "Learner" },
    { value: "Job Seeker / Applicant", label: "Job seeker / Applicant" },
    { value: "Employee", label: "Employee" },
    { value: "Founder", label: "Founder" },
    { value: "Educator", label: "Educator" },
    { value: "Mentor", label: "Mentor" },
  ];

  // select ptions for the language dropdown
  const languageOptions = [
    { value: "", label: "Select Language" },
    { value: "English", label: "English" },
    { value: "French", label: "French" },
  ];
  //react-router useNavigate to navigate to a different route
  const navigate = useNavigate();

  //Create the different states for the formdata
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    userType: "",
    language: "",
  });

  //format label title from the formData properties
  function formatTitle(input) {
    return input
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .split(" ")
      .map((word, index) =>
        index === 0
          ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
          : word.toLowerCase()
      )
      .join(" ");
  }

  //create a State to track which input is focused
  const [focusedInputs, setFocusedInputs] = useState({
    firstName: false,
    lastName: false,
    username: false,
    password: false,
    confirmPassword: false,
    email: false,
  });

  // icon images that will be dynamically rendered
  const imageSources = {
    firstName:
      "https://d3f06rtlkr354b.cloudfront.net/public/front/img/name.png",
    lastName: "https://d3f06rtlkr354b.cloudfront.net/public/front/img/name.png",
    username: "https://d3f06rtlkr354b.cloudfront.net/public/front/img/user.png",
    password:
      "https://d3f06rtlkr354b.cloudfront.net/public/front/img/password.png",
    confirmPassword:
      "https://d3f06rtlkr354b.cloudfront.net/public/front/img/pass-check.png",
    email: "https://d3f06rtlkr354b.cloudfront.net/public/front/img/email.png",
  };

  //handling the input and setting the values for each field, filter the value of the firstName and lastName as it shouldn't take numbers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const filteredValue =
      name === "firstName" || name === "lastName"
        ? value.replace(/\d/g, "")
        : value;
    setFormData((prevData) => ({
      ...prevData,
      [name]: filteredValue,
    }));
  };

  //toggling the focused input
  const handleFocus = (inputName) => {
    setFocusedInputs((prevFocusedInputs) => ({
      ...prevFocusedInputs,
      [inputName]: true,
    }));
  };

  //toggling the focused to blur
  const handleBlur = (inputName) => {
    setFocusedInputs((prevFocusedInputs) => ({
      ...prevFocusedInputs,
      [inputName]: !!formData[inputName],
    }));
  };

  //toggle password visbility
  const togglePasswordVisibility = () => {
    setFormData((prevData) => ({
      ...prevData,
      passwordVisible: !prevData.passwordVisible,
    }));
  };

  //sending post request to server, after submiting form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/register",
        formData
      );

      // Redirect to login page after successful registration
      navigate("/login");
    } catch (error) {
      console.error(error);
      //error messahe using toast
      toast.error(
        error.response.data.message || "Registration failed. Please try again."
      );
    }
  };

  //SSO register
  const googleRegister = useGoogleLogin({
    onSuccess: () => {
      localStorage.clear();
      navigate("/success");
    },
  });

  //excluded fields that we will not dynamically generate
  const excludedFields = ["passwordVisible", "userType", "language"];

  const specialCharacters = "@#$%^&*?_~-()+={}[]|;:'“<>/,.";

  return (
    <div className="auth-container">
      <div className="image-container">
        <img src={Carousel} />
      </div>
      <div className="signup-container">
        <div className="col-lg-4 col-md-6 p-l-80 p-r-0">
          <div className="card login-card mt-4 m-b-20">
            <div className="card-header bg-white text-center">
              <div className="login-logo p-10">
                <a href="#">
                  <img
                    src="https://d3f06rtlkr354b.cloudfront.net/public/front/img/logoNew.png"
                    alt=""
                  />
                </a>
              </div>
            </div>
            <div className="card-body">
              {/* form Login */}

              <form
                method="POST"
                onSubmit={handleSubmit}
                acceptCharset="UTF-8"
                className="login-form form-horizontal"
                autoComplete="off"
                noValidate="true"
                id="user-register-form"
                encType="multipart/form-data"
              >
                {/* Iterate over the fields dynamically render them to handle the focus and blur states */}
                {Object.keys(formData)
                  .filter((fieldName) => !excludedFields.includes(fieldName))
                  .map((fieldName) => (
                    <div className="md-form cs-form" key={fieldName}>
                      <input
                        type={
                          (fieldName == "password" ||
                            fieldName == "confirmPassword") &&
                          !formData.passwordVisible
                            ? "password"
                            : "text"
                        }
                        name={fieldName}
                        id={fieldName}
                        value={formData[fieldName]}
                        onChange={handleInputChange}
                        onFocus={() => handleFocus(fieldName)}
                        onBlur={() => handleBlur(fieldName)}
                        className={
                          fieldName == "password"
                            ? "form-control password"
                            : "form-control"
                        }
                      />
                      {/* Adding password show button */}
                      {formData.passwordVisible &&
                        (fieldName == "password" ||
                          fieldName == "confirmPassword") && (
                          <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="show-password-button"
                          >
                            <FontAwesomeIcon
                              icon={icon({ name: "eye-slash" })}
                            />
                          </button>
                        )}
                      {!formData.passwordVisible &&
                        (fieldName == "password" ||
                          fieldName == "confirmPassword") && (
                          <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="show-password-button"
                          >
                            <FontAwesomeIcon icon={icon({ name: "eye" })} />
                          </button>
                        )}
                      <label
                        htmlFor={fieldName}
                        className={
                          focusedInputs[fieldName] || formData[fieldName]
                            ? "active"
                            : ""
                        }
                      >
                        {" "}
                        <span className="input-icon">
                          {/* Use the image source from the object */}
                          <img src={imageSources[fieldName]} alt="" />
                        </span>{" "}
                        {formatTitle(fieldName)}
                      </label>
                      {/*Adding strength and password checklist */}
                      {fieldName === "password" && (
                        <>
                          <PasswordStrengthBar password={formData[fieldName]} />
                          <div
                            className="clearfix"
                            style={{ paddingBottom: "2%" }}
                          >
                            <div style={{ marginBottom: "2%" }}>
                              Password must include:
                            </div>
                            <PasswordChecklist
                              rules={[
                                "minLength",
                                "number",
                                "capital",
                                "lowercase",
                                "specialChar",
                              ]}
                              minLength={8}
                              value={formData[fieldName]}
                              onChange={(isValid) => {}}
                              messages={{
                                specialChar:
                                  "1 special character:" +
                                  " " +
                                  specialCharacters,
                                minLength: "8 to 14 characters",
                                capital: "1 uppercase letter",
                                lowercase: "1 lowercase latter",
                                number: "1 number",
                              }}
                            />
                          </div>{" "}
                        </>
                      )}

                      {fieldName === "confirmPassword" && (
                        <>
                          <div
                            className="clearfix"
                            style={{
                              display: focusedInputs.confirmPassword
                                ? "block"
                                : "none",
                            }}
                          >
                            <PasswordChecklist
                              rules={["match"]}
                              minLength={5}
                              value={formData["password"]}
                              valueAgain={formData[fieldName]}
                              onChange={(isValid) => {}}
                            />
                          </div>{" "}
                        </>
                      )}
                    </div>
                  ))}

                <div className="md-form cs-form">
                  <div className="md-form cs-form">
                    <Select
                      id="user_type"
                      name="user_type"
                      options={userTypeOptions}
                      value={userTypeOptions.find(
                        (option) => option.value === formData.userType
                      )}
                      onChange={(selectedOption) =>
                        setFormData({
                          ...formData,
                          userType: selectedOption.value,
                        })
                      }
                      styles={{ control: (base) => ({ ...base, height: 50 }) }}
                    />
                  </div>
                  <div className="md-form cs-form selectLanguage">
                    <small style={{ float: "right" }}>
                      <i>Optional</i>
                    </small>
                    <Select
                      name="language_id"
                      options={languageOptions}
                      value={languageOptions.find(
                        (option) => option.value === formData.language
                      )}
                      onChange={(selectedOption) =>
                        setFormData({
                          ...formData,
                          language: selectedOption.value,
                        })
                      }
                      styles={{ control: (base) => ({ ...base, height: 50 }) }}
                      className="language"
                    />
                  </div>
                </div>
                <div
                  style={{
                    transform: "scale(0.85)",
                    transformOrigin: "0 0",
                    textAlign: "center",
                  }}
                >
                  <ReCAPTCHA sitekey={process.env.REACT_APP_SITE_KEY} />
                </div>
                <p>
                  <small>
                    By registering, you agree to the Prepr&nbsp;
                    <a href="#" target="_blank">
                      Terms of use
                    </a>
                    ,
                    <a href="#" target="_blank">
                      &nbsp;Privacy policy and cookie policy
                    </a>
                  </small>
                </p>
                <div className="text-center mt-3">
                  <button
                    className="btn btn-warning btn-block waves-effect waves-light"
                    type="submit"
                  >
                    Register
                  </button>
                </div>
                <div className="text-center or">
                  <p>or</p>
                </div>

                <div className="m-b-5">
                  <a
                    href="javascript:void(0)"
                    onClick={() => googleRegister()}
                    className="btn  btn-danger btn-block waves-effect waves-light"
                  >
                    Continue with Google
                  </a>
                </div>
              </form>
              {/* form login */}
              <div className="text-center m-t-8 m-b-5 f-s-14">
                Already have an account?
                <Link to="/login" className="text-light-green">
                  &nbsp;Log in
                </Link>
              </div>
              {/* form organization/lab/challenge register page */}
              <div className="text-center m-t-8 m-b-5 f-s-14">
                Are you an organization?
                <a href="#" className="text-light-green">
                  &nbsp;Organization register
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
