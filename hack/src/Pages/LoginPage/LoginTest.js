import { useRef, useState, useEffect } from "react";
import { useNavigate, Link,Redirect } from 'react-router-dom';
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { FaEyeSlash, FaEye } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import {gapi} from 'gapi-script';
// import axios from "axios";
import './Style.css';
import { handleLogin } from "../../Components/AxiosConfiguration/BackendData/data";
// import LoginButton from "../../Components/login";
// import Main from "../../SSO/Main";
 
// const clientId = "369265026491-slknr9saul13e1006bj9gkv0udr668tv.apps.googleusercontent.com";
 
 
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,}$/;
 
const LoginTest = ({setUserRole}) => {
    const navigate = useNavigate();
    const errRef = useRef();
 
    const [email, setEmail] = useState('');
    const [validEmail, setvalidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);
 
    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
 
    const [selectedRole, setSelectedRole] = useState('');
 
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
 
   
 
    useEffect(() => {
        setvalidEmail(EMAIL_REGEX.test(email));
    }, [email])
 
    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password));
    }, [password])
 
    useEffect(() => {
        setErrMsg('');
    }, [email, password,selectedRole])
 
    const handleSubmit = async (e) => {
        e.preventDefault();
 
        try {
            const userData = await handleLogin(email, password, selectedRole);
            const { role } = userData;
            console.log(userData);
            toast.success('Login Successful')
 
            setTimeout(() => {
                setSuccess(true);
              }, 5000);
            
              
            setUserRole(role);
 
 
    switch (selectedRole) {
        case 'Participant':
            return navigate("/participantdashboard") ;
        case 'Panelist':
            return navigate("/panelistdashboard");
        case 'Judge':
            return navigate("/judgedashboard");
        default:
            return (
                navigate("/logintest"),
                toast("Please select the role")
        )
 
            // Handle if no role is selected
           
    }
        } catch (err) {
            console.error("Login failed", err);
            toast.error('!Login Failed')
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                const errorData = err.response?.data;
                if (errorData?.message === 'email already exists') {
                    setErrMsg('email already exists');
                } else {
                    setErrMsg('Login Failed');
                }
            }
        }
    }
 
    return (
        <>
            {success ? (
               
                   
                    navigate('/Home')
                                       
                         
               
            ) : (
                <div>
 
                    <div className="error-container">
                        <p id="enote" className={ email && !validEmail ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faExclamationCircle} />
                            <p className="warning">email</p> <br />
                            Enter valid email
                        </p>
 
                        <p id="passwordnote" className={passwordFocus && !validPassword? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            <p className="warning">Password</p> <br />
                            8 to 24 characters.<br />
                            Must include uppercase and lowercase letters, a number and a special character.<br />
                            Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                        </p>
                    </div>
                <section>
                    <div className="error">
                        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    </div>
                    <div className="heading">
                        <h1>Login</h1>
                    </div>
                    <div className="form">
 
                        <form onSubmit={handleSubmit}>
                           
                           
                            <div className="form-grp">
 
                                <label htmlFor="email">
                                    Email:
                                    <FontAwesomeIcon icon={faCheck} className={validEmail ? "valid" : "hide"} />
                                    <FontAwesomeIcon icon={faTimes} className={validEmail || !email ? "hide" : "invalid"} />
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    autoComplete="off"
                                    placeholder="Email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    required
                                    aria-invalid={validEmail ? "false" : "true"}
                                    aria-describedby="enote"
                                    onFocus={() => setEmailFocus(true)}
                                    onBlur={() => setEmailFocus(false)}
                                    />
                                {/* <p id="enote" className={EmailFocus && Email && !validEmail ? "instructions" : "offscreen"}>
                                    <FontAwesomeIcon icon={faExclamationCircle} />
                                    Enter valid Email
                                </p> */}
                            </div>
                            <div className="form-grp">
 
                                <label htmlFor="password">
                                    Password:
                                    <FontAwesomeIcon icon={faCheck} className={validPassword ? "valid" : "hide"} />
                                    <FontAwesomeIcon icon={faTimes} className={validPassword || !password ? "hide" : "invalid"} />
                                </label>
                                <div className="pass">
 
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        id="password"
                                        onChange={(e) => setPassword(e.target.value)}
                                        value={password}
                                        required
                                        aria-invalid={validPassword ? "false" : "true"}
                                        aria-describedby="passwordnote"
                                        onFocus={() => setPasswordFocus(true)}
                                        onBlur={() => setPasswordFocus(false)}
                                        />
                                    {/* style={{ color: showPassword ? '#ed8750' : '#000' }} */}
                                    <button onClick={() => setShowPassword(!showPassword)} className="show-password">
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                                {/* <p id="passwordnote" className={passwordFocus && !validpassword ? "instructions" : "offscreen"}>
                                    <FontAwesomeIcon icon={faInfoCircle} />
                                    8 to 24 characters.<br />
                                    Must include uppercase and lowercase letters, a number and a special character.<br />
                                    Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                                </p> */}
                            </div>
                            <div className="form-grp">
            <label htmlFor="role">Role:</label>
            <select
                id="dropdown"
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                style={{
                    backgroundColor: '#f9f9f9',
                    padding: '8px',
                    border: '1px solid #ccc',
                    borderRadius: '10px',
                    fontSize: '16px',
                    width: '200px',
                    cursor: 'pointer'
                }}
            >
                <option value="">Select a role</option>
                <option value="Participant">Participant</option>
                <option value="Panelist">Panelist</option>
                <option value="Judge">Judge</option>
            </select>
           
        </div>
 
 
                            <button disabled={!validPassword? true : false} className="Sign-up">Sign In</button>
                        </form>
                        <ToastContainer/>
                        <hr />
                        <div className="sso">
                           
                        </div>
                        <div className="signIn">
                            New User?
                            <span className="line">
                                {/* router link  */}
                               
                                <Link to='/register'>Sign Up</Link>
                            </span>
                        </div>
                    </div>
                </section>
            </div>
            )}
       
       
       
        {/* // ... (rest of the component remains the same) */}
       
       
 
        </>
       
    )
}
 
export default LoginTest;
