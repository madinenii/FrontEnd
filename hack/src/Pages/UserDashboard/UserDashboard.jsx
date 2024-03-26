// // NavigationBar.js
// import React, {useState} from "react";
// import { useNavigate } from 'react-router-dom';
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./UserDashboard.css";

// import Timer from "./Timer";
// import { handleIdeaSubmission } from "../../Components/AxiosConfiguration/BackendData/IdeaData";

// // import url('https://fonts.googleapis.com/css2?family=Inria+Sans:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap')

// function UserDashboard() {
//   // const [selectedFiles, setSelectedFiles] = React.useState([]);
//   const [selectedFiles, setSelectedFiles] = useState([]);
//   const [uploadedFileName, setUploadedFileName] = useState("");
//   const [validationErrors, setValidationErrors] = useState({});

//   const [formData, setFormData] = useState({
//     // Define your form fields here
//     ideaTitle: '',
//     selectedDomain:'',
//     description: '',
//   });
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//     setValidationErrors({
//       ...validationErrors,
//       [name]: null,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const userData =await handleIdeaSubmission(ideaTitle,"ideaDescription"=description,"domain"=selectedDomain)

//     const errors = {};
//     if (!formData.ideaTitle) {
//       errors.ideaTitle = "Required";
//     }
//     if (!formData.selectedDomain) {
//       errors.selectedDomain = "Required";
//     }
//     if (!formData.description) {
//       errors.description = "Required";
//     }

//     if (Object.keys(errors).length > 0) {
//       setValidationErrors(errors);
//       return; // Prevent form submission if there are validation errors
//     }

//     const formDataToSend = new FormData();
  
//     // Append text inputs to the FormData object
//     formDataToSend.append('ideaTitle', formData.ideaTitle);
//     formDataToSend.append('selectedDomain', formData.selectedDomain);
//     formDataToSend.append('description', formData.description);
  
//     // Append the selected file to the FormData object
//     selectedFiles.forEach((file, index) => {
//       formDataToSend.append(`file${index}`, file);
//     });

//     for (let pair of formDataToSend.entries()) {
//       console.log(pair[0] + ', ' + pair[1]); 
//     }
//     console.log(formData);
//     console.log(selectedFiles);
//     try {
//       // Perform form submission logic here, e.g., API requests
//       // Example:
//       // const response = await fetch('https://example.com/upload', {
//       //   method: 'POST',
//       //   body: formDataToSend,
//       // });
      
//       // After successful submission, navigate to another page
//       navigate('/success'); // Navigating to '/success' route
//     } catch (error) {
//       console.error('Error submitting form:', error);
//     }
//   };
//   //const [disableTimer, setDisableTimer] = React.useState(false);
 
//   const handleFileChange = (event) => {
//     const files = Array.from(event.target.files);
//     setSelectedFiles(files);

//     if (files.length > 0) {
//       setUploadedFileName(files[0].name);
//     } else {
//       setUploadedFileName("");
//     }
//     console.log(files);
//   };

//   const openFileInput = (e) => {
//     e.preventDefault();
//     fileInputRef.current.click();
//   };

//   const fileInputRef = React.createRef();

//   return (
//     <div
//       style={{
//         display: "flex",
//         justifyContent: "space-around",
//         padding: "20px",
//       }}
//     >

//       <div
//         style={{
//           flex: 1,
//           backgroundColor: "#FF781699",
//           margin: "20px",
//           borderRadius: "20px",
//           height: "auto",
//           color: "white",
//           fontFamily: "Inter",
//         }}
//       >
//         <h2
//           style={{
//             textAlign: "center",
//             color: "#F66700",
//             fontFamily: "DM Serif Text",
//             marginBottom: "20px",
//             marginTop: "20px",
//           }}
//         >
//           Idea Submission Form
//         </h2>
//         <form style={{ marginLeft: "40px", marginRight: "40px" }} onSubmit={handleSubmit}>
//           <div className="mb-3">
//             <label for="formGroupExampleInput" className="form-label">
//               Idea Title
//             </label>
//             <input type="text" className={`form-control ${validationErrors.ideaTitle ? "is-invalid" : ""}`} id="ideaTitle" name='ideaTitle' value={formData.ideaTitle} onChange={handleChange}/>
//             {validationErrors.ideaTitle && <div className="invalid-feedback">{validationErrors.ideaTitle}</div>}
//           </div>
//           <br />
//           <label for="formGroupExampleInput" className="form-label">
//             Domain Name
//           </label>
//           <select className={`form-select ${validationErrors.selectedDomain ? "is-invalid" : ""}`} aria-label="Default select example" name="selectedDomain" value={formData.selectedDomain} onChange={handleChange}>
//             <option selected >Select Domain</option>
//             <option value="1">One</option>
//             <option value="2">Two</option>
//             <option value="3">Three</option>
//           </select>
//           {validationErrors.selectedDomain && <div className="invalid-feedback">{validationErrors.selectedDomain}</div>}
//           <br />
//           <div className="mb-3">
//             <label for="exampleFormControlTextarea1" className="form-label">
//               Description
//             </label>
//             <textarea
//               className={`form-control ${validationErrors.description ? "is-invalid" : ""}`}
//               id="exampleFormControlTextarea1"
//               rows="3"
//               name='description'
//               value={formData.description} onChange={handleChange}
//             ></textarea>
//             {validationErrors.description && <div className="invalid-feedback">{validationErrors.description}</div>}
//           </div>

//           <div>
//             <input
//               type="file"
//               style={{ display: "none" }}
//               onChange={handleFileChange}
//               ref={fileInputRef}
//             />
//             <button className="btn btn-light" onClick={openFileInput}>
//               Upload
//             </button>
//             {uploadedFileName && <span style={{marginLeft: '10px'}}>{uploadedFileName}</span>} {/* Display uploaded file name */}
//           </div>
//           <br />
//           <input
//             id="submitIdeabtn"
//             className="btn"
//             type="submit"
//             style={{
//               display: "flex",
//               justifyContent: "center",
//               color: "white",
//               backgroundColor: "#F66700",
//               alignItems: "right",
//               width: "100%",
//               textAlign: "center",
//             }}
//             value="Submit"
//           />
//         </form>
//       </div>
//       {/* Right Side - Time Left and Status Sections */}
//       <div style={{ flex: 1, color: "white", height:"auto" }}>
//         <Timer/>
//         <div
//           style={{
//             height: "43.5vh",
//             backgroundColor: "#FF781699",
//             margin: "20px",
//             borderRadius: "20px",
//             textAlign: "center",
//             marginBottom: "10px",
//           }}
//         >
//           <h2
//             style={{
//               color: "#F66700",
//               fontFamily: "DM Serif Text",
//               fontWeight: "400",
//               paddingTop: "20px",
//             }}
//           >
//             Status
//           </h2>
//           <p
//             style={{
//               fontSize: "30px",
//               display: "flex",
//               justifyContent: "center",
//               position: "relative",
//               top: "15%",
//               fontFamily: "Inria Sans",
//             }}
//           >
//             Pending Approval
//           </p>
//         </div>
//       </div>
//       :
//     </div>
//   );
// }

// export default UserDashboard;
