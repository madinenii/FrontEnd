import { useEffect, useState } from "react";
import React from "react";
import "./UserProfile.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MEMBERSSUBMIT_URL = "/team/create";


const UserProfile = () => {
  const navigate = useNavigate(); 
  const [teamName, setTeamName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [editFlag, setEditFlag] = useState({ flag: false, index: null });

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };
  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handleDepartmentChange = (event) => {
    setDepartment(event.target.value);
  };
  const handleTeamNameChange = (event) => {
    setTeamName(event.target.value);
  };

  const [members, setMembers] = useState([]);
  const addMember = () => {
    if (editFlag.flag) {
      const newMembers = [...members];
      newMembers[editFlag.index] = { firstName, lastName, email, department };
      setMembers(newMembers);
      setEditFlag({ flag: false, index: null });
    } else {
      setMembers([...members, { firstName, lastName, email, department }]);
    }
    setFirstName("");
    setLastName("");
    setEmail("");
    setDepartment("");
  };
  useEffect(() => {
    console.log(members);
  }, [members]);

  const editMember = (index) => {
    setEditFlag({ flag: true, index: index });
    setFirstName(members[index].firstName);
    setLastName(members[index].lastName);
    setEmail(members[index].email);
    setDepartment(members[index].department);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const teamName = e.target.teamName.value;
    try {
      const response = await axios.post(
        MEMBERSSUBMIT_URL,
        {teamName,teamMembers:[{ name:members[0].firstName, email:members[0].email},
        { name:members[1].firstName, email:members[1].email},
        { name:members[2].firstName, email:members[2].email},
        { name:members[3].firstName, email:members[3].email}]},
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      
      console.log(response?.data);
      console.log(response?.accessToken);
      console.log(JSON.stringify(response));
      navigate("/success");
    } catch (err){
      console.error("Error submitting form:", err);
    }
  }
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
          paddingBottom:"2rem",
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
          Team
        </h2>
        <form
          style={{
            marginLeft: "40px",
            marginRight: "40px",
            fontFamily: "Inter",
          }}
        >
          <div className="mb-3">
            <label htmlFor="formGroupExampleInput" className="form-label">
              Team Name
            </label>
            <input
              type="text"
              className="form-control"
              id="ideaTitle"
              onChange={handleTeamNameChange}
              value={teamName}
            />
          </div>
          <br />
          <strong>
            <h4
              style={{
                textAlign: "center",
                color: "#F66700",
                fontFamily: "Inter",
                margin: "-16px",
                fontSize: "20px",
              }}
            >
              TEAM MEMBERS
            </h4>
          </strong>
          <br />
          <div>
            <div style={{ display: "flex" }}>
              <div style={{ margin: "2px" }}>
                <label htmlFor="formGroupExampleInput" className="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  value={firstName}
                  onChange={handleFirstNameChange}
                />
              </div>
              <div style={{ margin: "2px" }}>
                <label htmlFor="formGroupExampleInput" className="form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  value={lastName}
                  onChange={handleLastNameChange}
                />
              </div>
            </div>
            <div style={{ display: "flex" }}>
              <div style={{ margin: "2px" }}>
                <label htmlFor="formGroupExampleInput" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  aria-describedby="emailHelp"
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>
              <div style={{ margin: "2px" }}>
                <label htmlFor="formGroupExampleInput" className="form-label">
                  Department
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="department"
                  value={department}
                  onChange={handleDepartmentChange}
                />
              </div>
            </div>
          </div>
          <br />
          <input
            id="submitIdeabtn"
            className="btn"
            style={{
            
              display: "flex",
              justifyContent: "right",
              color: "white",
              backgroundColor: "#F66700",
              alignItems: "right",

              textAlign: "center",
            }}
            value={editFlag.flag ? "Edit Members" : "Add Members"}
            onClick={addMember}
          />
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
            onClick={handleSubmit}
          />
        </form>
      </div>
      {/* Right Side - Time Left and Status Sections */}

      <div
        className="team-member-card"
        style={{
          flex: 1,
          backgroundColor: "#FF781699",
          margin: "20px",
          borderRadius: "20px",
          height: "auto",
          color: "black",
          fontFamily: "Inter",
        }}
      >
        {members.map((member, index) => {
          if (index < 4) {
            return (
              <div
                className="card cod"
                style={{
                  height: "auto",
                  margin: "3.5vh",
                  padding: "0.5rem",
                  position: "relative",
                  backgroundColor: "white",
                  borderRadius: "1.5rem",
                  boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
                  width: "auto",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <div
                  className="card-body codil"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    flex: "75%",
                  }}
                >
                  <p style={{ fontSize: "0.8rem" }}>
                    <strong>Team Member {index + 1}</strong>
                    <br />
                    <strong>Name: </strong>
                    {member.firstName} {member.lastName}
                    <br />
                    <strong>Email: </strong> {member.email}
                    <strong> Department: </strong> {member.department}
                  </p>
                </div>

                <div
                  className="codir"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    flex: "25%",
                  }}
                >
                  <button
                    className="btn"
                    style={{
                      color: "white",
                      fontSize: ".5rem",
                      backgroundColor: "#F66700",
                      padding: "0.5rem",
                      textAlign: "center",
                      width: "fit-content",
                      margin: "0.4rem",
                      borderRadius: "1.5rem",
                      marginBottom: "0.4rem",
                    }}
                    disabled={editFlag.index === index}
                    onClick={() => {
                      editMember(index);
                    }}
                  >
                    Edit Member
                  </button>
                </div>
              </div>
            );
          }
          return null; 
        })}
      </div>
    </div>
  );
};

export default UserProfile;
