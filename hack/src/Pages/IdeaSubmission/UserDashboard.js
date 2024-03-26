// NavigationBar.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./UserDashboard.css";
// import axios from "axios";
import axios from "axios";

import Timer from "./Timer";
const IDEASUBMIT_URL = "/teams/add";
// import url('https://fonts.googleapis.com/css2?family=Inria+Sans:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap')

function UserDashboard() {
  // const [selectedFiles, setSelectedFiles] = React.useState([]);
  // const [selectedFiles, setSelectedFiles] = useState([]);
  // const [uploadedFileName, setUploadedFileName] = useState("");
  const [validationErrors, setValidationErrors] = useState({});

  const [formData, setFormData] = useState({
    // Define your form fields here
    email: "",
    ideaTitle: "",
    domain: "",
    ideaDescription: "",
    submissionUrl:"",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setValidationErrors({
      ...validationErrors,
      [name]: null,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = {};
    if (!formData.ideaTitle) {
      errors.ideaTitle = "Required";
    }
    if (!formData.domain) {
      errors.domain = "Required";
    }
    if (!formData.ideaDescription) {
      errors.ideaDescription = "Required";
    }
    if (!formData.email) {
      errors.email = "Required";
    }
    if (!formData.submissionUrl) {
      errors.submissionUrl = "Required";
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return; // Prevent form submission if there are validation errors
    }

    const formDataToSend = new FormData();

    // Append text inputs to the FormData object
    formDataToSend.append("ideaTitle", formData.ideaTitle);
    formDataToSend.append("domain", formData.domain);
    formDataToSend.append("ideaDescription", formData.ideaDescription);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("submissionUrl", formData.submissionUrl);

    // Append the selected file to the FormData object
    // selectedFiles.forEach((file, index) => {
    //   formDataToSend.append(`file${index}`, file);
    // });

    for (let pair of formDataToSend.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    console.log(formData);
    // console.log(selectedFiles);
    //     try {
    //       const response = await axios.post(REGISTER_URL,
    //           JSON.stringify({ email, ideaTitle, description, domain }),
    //           {
    //               headers: { 'Content-Type': 'application/json' },
    //               withCredentials: true
    //           }
    //       );
    //       console.log(response?.data);
    //       console.log(response?.accessToken);
    //       console.log(JSON.stringify(response))
    //     } catch (err) {
    //     if (!err?.response){
    //       setErrMsg('No Server Response');
    //   } else if (err.response?.status === 409) {
    //       const errorData = err.response?.data;
    //       if (errorData?.message === 'email already exists') {
    //           setErrMsg('email already exists'); // Error message for email already exists
    //       } else if (errorData?.message === 'firstName and lastName combination already exists') {
    //           setErrMsg('firstName and lastName combination already exists'); // Error message for same first and last names
    //       }
    //       else {
    //           setErrMsg('Registration Failed')
    //       }
    //       errRef.current.focus();

    // }}
    try {
      // Perform form submission logic here, e.g., API requests
      // Example:
      // const response = await fetch('https://example.com/upload', {
      //   method: 'POST',
      //   body: formDataToSend,
      // });
      const response = await axios.post(IDEASUBMIT_URL, formDataToSend, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      console.log(response?.data);
      console.log(response?.accessToken);
      console.log(JSON.stringify(response));
      // After successful submission, navigate to another page
      navigate("/success"); // Navigating to '/success' route
      setFormData({
        email: "",
        ideaTitle: "",
        domain: "",
        ideaDescription: "",
        submissionUrl: "",
      });
      // setSelectedFiles([]);
      // setUploadedFileName("");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  //const [disableTimer, setDisableTimer] = React.useState(false);

  // const handleFileChange = (event) => {
  //   const files = Array.from(event.target.files);
  //   setSelectedFiles(files);

  //   if (files.length > 0) {
  //     setUploadedFileName(files[0].name);
  //   } else {
  //     setUploadedFileName("");
  //   }
  //   console.log(files);
  // };

  // const openFileInput = (e) => {
  //   e.preventDefault();
  //   fileInputRef.current.click();
  // };

  // const fileInputRef = React.createRef();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        padding: "20px",
      }}
    >
      <div
        style={{
          flex: 1,
          backgroundColor: "#FF781699",
          margin: "20px",
          borderRadius: "20px",
          height: "auto",
          color: "white",
          fontFamily: "Inter",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            color: "#F66700",
            fontFamily: "DM Serif Text",
            marginBottom: "20px",
            marginTop: "20px",
          }}
        >
          Idea Submission Form
        </h2>
        <form
          style={{ marginLeft: "40px", marginRight: "40px" }}
          onSubmit={handleSubmit}
        >
          <div className="mb-3">
            <label for="formGroupExampleInput" className="form-label">
              Idea Title
            </label>
            <input
              type="text"
              className={`form-control ${
                validationErrors.ideaTitle ? "is-invalid" : ""
              }`}
              id="ideaTitle"
              name="ideaTitle"
              value={formData.ideaTitle}
              onChange={handleChange}
            />
            {validationErrors.ideaTitle && (
              <div className="invalid-feedback">
                {validationErrors.ideaTitle}
              </div>
            )}
          </div>
          <br />
          <label for="formGroupExampleInput" className="form-label">
            Domain Name
          </label>
          <select
            className={`form-select ${
              validationErrors.domain ? "is-invalid" : ""
            }`}
            aria-label="Default select example"
            name="domain"
            value={formData.domain}
            onChange={handleChange}
          >
            <option selected>Select Domain</option>
            <option value="IoT">IoT</option>
            <option value="Machine Learning">Machine Learning</option>
            <option value="Big Data">Big Data</option>
            <option value="CyberSecurity">CyberSecurity</option>
            <option value="Data Science">Data Science</option>
            <option value="Artificial Intelligence">Artificial Intelligence</option>
          </select>
          {validationErrors.domain && (
            <div className="invalid-feedback">
              {validationErrors.domain}
            </div>
          )}
          <br />
          <div className="mb-3">
            <label for="exampleFormControlTextarea1" className="form-label">
              Description
            </label>
            <textarea
              className={`form-control ${
                validationErrors.ideaDescription ? "is-invalid" : ""
              }`}
              id="exampleFormControlTextarea1"
              rows="3"
              name="Description"
              value={formData.ideaDescription}
              onChange={handleChange}
            ></textarea>
            {validationErrors.ideaDescription && (
              <div className="invalid-feedback">
                {validationErrors.ideaDescription}
              </div>
            )}
          </div>

          <div>
            
            <div className="mb-3">
            <label for="formGroupExampleInput" className="form-label">
              Email
            </label>
            <input
              type="text"
              className={`form-control ${
                validationErrors.email ? "is-invalid" : ""
              }`}
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {validationErrors.email && (
              <div className="invalid-feedback">
                {validationErrors.email}
              </div>
            )}
          </div>
          <div>
            
            <div className="mb-3">
            <label for="formGroupExampleInput" className="form-label">
              Github Url
            </label>
            <input
              type="url"
              className={`form-control ${
                validationErrors.submissionUrl ? "is-invalid" : ""
              }`}
              id="url"
              name="url"
              value={formData.submissionUrl}
              onChange={handleChange}
            />
            {validationErrors.submissionUrl && (
              <div className="invalid-feedback">
                {validationErrors.submissionUrl}
              </div>
            )}
            </div>
          </div>
          </div>
          <br />
          <input
            id="submitIdeabtn"
            className="btn"
            type="submit"
            style={{
              display: "flex",
              justifyContent: "center",
              color: "white",
              backgroundColor: "#F66700",
              alignItems: "right",
              width: "100%",
              textAlign: "center",
            }}
            value="Submit"
          />
        </form>
      </div>
      {/* Right Side - Time Left and Status Sections */}
      <div style={{ flex: 1, color: "white", height: "auto" }}>
        <Timer />
        <div
          style={{
            height: "43.5vh",
            backgroundColor: "#FF781699",
            margin: "20px",
            borderRadius: "20px",
            textAlign: "center",
            marginBottom: "10px",
          }}
        >
          <h2
            style={{
              color: "#F66700",
              fontFamily: "DM Serif Text",
              fontWeight: "400",
              paddingTop: "20px",
            }}
          >
            Status
          </h2>
          <p
            style={{
              fontSize: "30px",
              display: "flex",
              justifyContent: "center",
              position: "relative",
              top: "15%",
              fontFamily: "Inria Sans",
            }}
          >
            Pending Approval
          </p>
        </div>
      </div>
      :
    </div>
  );
}

export default UserDashboard;