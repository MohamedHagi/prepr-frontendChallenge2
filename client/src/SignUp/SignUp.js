import React, { useState } from "react";
import "../SignUp/signup.css";
import PasswordChecklist from "react-password-checklist";
import PasswordStrengthBar from "react-password-strength-bar";
import { Link } from "react-router-dom";

export default function SignUp() {
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
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
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

  //handling the input and setting the values for each field
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
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

  return (
    <div className="col-lg-4 col-md-6 p-l-80 p-r-0">
      <div className="card login-card mt-4 m-b-20">
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
          {/* form Login */}

          <form
            method="POST"
            action="https://preprlabs.org/register"
            acceptCharset="UTF-8"
            className="login-form form-horizontal"
            autoComplete="off"
            noValidate="true"
            id="user-register-form"
            encType="multipart/form-data"
          >
            <input
              name="_token"
              type="hidden"
              defaultValue="BGk6lKkLhxJz1Jpe5oIFsHe3RvOX5rgc8Md08HrS"
            />

            {/* Iterate over the fields dynamically render them to handle the focus and blur states */}
            {Object.keys(formData).map((fieldName) => (
              <div className="md-form cs-form" key={fieldName}>
                <input
                  type="text"
                  name={fieldName}
                  id={fieldName}
                  value={formData[fieldName]}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus(fieldName)}
                  onBlur={() => handleBlur(fieldName)}
                  className="form-control"
                />
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
                <span className="text-left help-block text-red" />

                {fieldName === "password" && (
                  <>
                    <PasswordStrengthBar password={formData[fieldName]} />
                    <div className="clearfix" style={{ paddingBottom: "2%" }}>
                      <PasswordChecklist
                        rules={[
                          "minLength",
                          "specialChar",
                          "number",
                          "capital",
                        ]}
                        minLength={5}
                        value={formData[fieldName]}
                        onChange={(isValid) => {}}
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
            <input
              type="hidden"
              name="normal_user"
              defaultValue="normal_user"
            />
            <div className="md-form cs-form">
              <select
                id="user_type"
                name="user_type"
                className="form-control"
                style={{ height: 50 }}
              >
                <option value="" selected="">
                  User type
                </option>
                <option value="learner">Learner</option>
                <option value="job_seeker">Job seeker / Applicant</option>
                <option value="employee">Employee</option>
                <option value="founder">Founder</option>
                <option value="educator">Educator</option>
                <option value="mentor">Mentor</option>
              </select>
              <span className="text-left help-block text-red" />
            </div>
            <div className="md-form cs-form">
              <small style={{ float: "right" }}>
                <i>Optional</i>
              </small>
              <select
                id="language_id"
                name="language_id"
                className="form-control"
                style={{ height: 50 }}
              >
                <option value="">Select Language</option>
                <option value={1}>English</option>
                <option value={2}>French</option>
              </select>
              <span className="text-left help-block text-red" />
            </div>
            <div className="text-center mt-3">
              <div
                id="recaptcha2"
                className="g-recaptcha"
                data-sitekey="6Lf2JrYoAAAAAK7Zp172b6uPSsSAJGyHZhicSwwO"
              >
                <div style={{ width: 304, height: 78 }}>
                  <div>
                    <iframe
                      title="reCAPTCHA"
                      width={304}
                      height={78}
                      role="presentation"
                      name="a-l6x72611ehi9"
                      frameBorder={0}
                      scrolling="no"
                      sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation allow-modals allow-popups-to-escape-sandbox allow-storage-access-by-user-activation"
                      src="https://www.google.com/recaptcha/api2/anchor?ar=2&k=6Lf2JrYoAAAAAK7Zp172b6uPSsSAJGyHZhicSwwO&co=aHR0cHM6Ly9wcmVwcmxhYnMub3JnOjQ0Mw..&hl=en&v=-QbJqHfGOUB8nuVRLvzFLVed&size=normal&cb=weu4d3dugko1"
                    />
                  </div>
                  <textarea
                    id="g-recaptcha-response"
                    name="g-recaptcha-response"
                    className="g-recaptcha-response"
                    style={{
                      width: 250,
                      height: 40,
                      border: "1px solid rgb(193, 193, 193)",
                      margin: "10px 25px",
                      padding: 0,
                      resize: "none",
                      display: "none",
                    }}
                    defaultValue={""}
                  />
                </div>
                <iframe style={{ display: "none" }} />
              </div>
            </div>
            <p>
              <small>
                By registering, you agree to the Prepr{" "}
                <a href="https://prepr.org/terms-of-use/" target="_blank">
                  Terms of use
                </a>
                ,
                <a href="https://prepr.org/privacy-policy/" target="_blank">
                  Privacy policy and cookie policy
                </a>
              </small>
            </p>
            <div className="text-center mt-3">
              <input
                type="hidden"
                name="url_intended"
                defaultValue="https://preprlabs.org/"
              />
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
                onclick="openModal('google')"
                className="btn  btn-danger btn-block waves-effect waves-light"
              >
                Continue with Google
              </a>
            </div>
          </form>
          {/* form login */}
          <div className="text-center m-t-8 m-b-5 f-s-14">
            Already have an account?{" "}
            <Link to="/login" className="text-light-green">
              Log in
            </Link>
          </div>
          {/* form organization/lab/challenge register page */}
          <div className="text-center m-t-8 m-b-5 f-s-14">
            Are you an organization?{" "}
            <a
              href="https://preprlabs.org/organization/register"
              className="text-light-green"
            >
              Organization register
            </a>
          </div>
        </div>
      </div>
      {/* <input
          type="text"
          name="firstName"
          id="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
          className="form-control"
          autoComplete="off"
        />
    
      <PasswordStrengthBar password={formData.firstName} />
      <div className="clearfix">
        <PasswordChecklist
          rules={["minLength", "specialChar", "number", "capital", "match"]}
          minLength={5}
          value={formData.firstName}
          onChange={(isValid) => {}}
        />
      </div> */}
    </div>
  );
}
