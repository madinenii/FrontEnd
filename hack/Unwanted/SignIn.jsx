import { useRef, useState, useEffect } from "react";
import { useNavigate,Link } from 'react-router-dom';
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { FaEyeSlash, FaEye } from 'react-icons/fa';
import axios from "axios";
import './Style.css';
// import styles from './Style1.module.css'
// import { CreateContext } from "../../App";
import { useContext } from "react";
import { handleLogin } from "../src/Components/AxiosConfiguration/BackendData/data";

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,}$/;
 
const REGISTER_URL = '/participant/registration';
 
const SignIn= () => {
    const navigate=useNavigate();
   
    const errRef = useRef();
 
 
   

 
    // const {email, setemail} = useContext(CreateContext);
    const [email, setemail] = useState('');
    const [validemail, setValidemail] = useState(false);
    const [emailFocus, setemailFocus] = useState(false);
 
    const [password, setpassword] = useState('');
    const [validpassword, setValidpassword] = useState(false);
    const [passwordFocus, setpasswordFocus] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
 
    
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    // const navigate=useNavigate();
 
 
 
    // useEffect(()=>{
    //   if(success)
    //     navigate('/');
 
    // },[success,navigate])
 

    
    useEffect(() => {
        setValidemail(EMAIL_REGEX.test(email));
    }, [email])
 
    useEffect(() => {
        setValidpassword(PWD_REGEX.test(password));
       
    }, [password])
 
    useEffect(() => {
        setErrMsg('');
    }, [email, password])
 
    const handleSubmit = async(e) => {
        e.preventDefault();
        
        try {
            const userData = await handleLogin(email, password);
            // Registration successful, userData contains user information
            console.log(userData); // Example: { userId: "123456", firstName: "John", ... }
        
            // Perform actions such as displaying a success message, updating state, or navigating
            // For example, you can navigate to the login page after successful registration
            // navigate('/login');
            setSuccess(true);
            // setUserRole(role);
            // setIsLoggedIn(true);
            navigate('/SignUp')
        
            // Clear form fields after successful registration if needed
          
            setemail('');
            setpassword('');
          
        
        } catch (err) {
            // Handle registration errors
            console.error("Login failed", err);
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                const errorData = err.response?.data;
                if (errorData?.message === 'email already exists') {
                    setErrMsg('email already exists');
                 } 
                //  else if (errorData?.message === 'firstName and lastName combination already exists') {
                //     setErrMsg('firstName and lastName combination already exists');
                // } 
                else {
                    setErrMsg('Registration Failed');
                }
                // errRef.current.focus();
            }
        }
      }

    //   const handleLogOut=()=>{
    //     setIsLoggedIn(false);
    //     setUserRole('');
    //   }
    
 
    return (
        <>
            {success ? (
                
                    
                    navigate('/login')
                                        
                         
                
            ) : (
                <div>
 
                    <div className="error-container">
                        <p id="enote" className={ email && !validemail ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faExclamationCircle} />
                            <p className="warning">email</p> <br />
                            Enter valid email
                        </p>
 
                        <p id="passwordnote" className={passwordFocus && !validpassword ? "instructions" : "offscreen"}>
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
                                    <FontAwesomeIcon icon={faCheck} className={validemail ? "valid" : "hide"} />
                                    <FontAwesomeIcon icon={faTimes} className={validemail || !email ? "hide" : "invalid"} />
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    autoComplete="off"
                                    placeholder="Email"
                                    onChange={(e) => setemail(e.target.value)}
                                    value={email}
                                    required
                                    aria-invalid={validemail ? "false" : "true"}
                                    aria-describedby="enote"
                                    onFocus={() => setemailFocus(true)}
                                    onBlur={() => setemailFocus(false)}
                                    />
                                {/* <p id="enote" className={emailFocus && email && !validemail ? "instructions" : "offscreen"}>
                                    <FontAwesomeIcon icon={faExclamationCircle} />
                                    Enter valid email
                                </p> */}
                            </div>
                            <div className="form-grp">
 
                                <label htmlFor="password">
                                    Password:
                                    <FontAwesomeIcon icon={faCheck} className={validpassword ? "valid" : "hide"} />
                                    <FontAwesomeIcon icon={faTimes} className={validpassword || !password ? "hide" : "invalid"} />
                                </label>
                                <div className="pass">
 
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        id="password"
                                        onChange={(e) => setpassword(e.target.value)}
                                        value={password}
                                        required
                                        aria-invalid={validpassword ? "false" : "true"}
                                        aria-describedby="passwordnote"
                                        onFocus={() => setpasswordFocus(true)}
                                        onBlur={() => setpasswordFocus(false)}
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
 
 
                            <button disabled={!validpassword? true : false} className="Sign-up">Sign In</button>
                        </form>
                        <hr />
                        <div className="sso"></div>
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
        </>
    )
 
}
export default SignIn;