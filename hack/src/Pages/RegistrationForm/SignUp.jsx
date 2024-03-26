import { useRef, useState, useEffect } from "react";
import { useNavigate,Link } from 'react-router-dom';
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { FaEyeSlash, FaEye } from 'react-icons/fa';
import axios from "axios";
import './Style.css';
// import { CreateContext } from "../../App";
import { useContext } from "react";
import { handleRegisterLogin } from "../../Components/AxiosConfiguration/BackendData/Registerdata";
// import Login from "../../Components/login";




const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const USER1_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,}$/;
 
const REGISTER_URL = '/participant/registration';
 
const SignUp= () => {
    const navigate=useNavigate();
    const FirstRef = useRef();
    const LastRef = useRef();
    const errRef = useRef();
 
 
    const [firstName, setfirstName] = useState('');
    const [validFName, setValidFName] = useState(false);
    const [FnameFocus, setFnameFocus] = useState(false);
 
 
    const [lastName, setlastName] = useState('');
    const [validLName, setValidLName] = useState(false);
    const [LnameFocus, setLnameFocus] = useState(false);

    const [dateOfBirth,setDateOfBirth]=useState(false);
 
    // const {email, setemail} = useContext(CreateContext);
    const [email, setemail] = useState('');
    const [validemail, setValidemail] = useState(false);
    const [emailFocus, setemailFocus] = useState(false);
 
    const [password, setpassword] = useState('');
    const [validpassword, setValidpassword] = useState(false);
    const [passwordFocus, setpasswordFocus] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
 
    const [matchpassword, setMatchpassword] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);
 
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    // const navigate=useNavigate();
 
 
 
    // useEffect(()=>{
    //   if(success)
    //     navigate('/');
 
    // },[success,navigate])
 
    useEffect(() => {
        FirstRef.current.focus();
    }, [])
    useEffect(() => {
        LastRef.current.focus();
    }, [])
 
    useEffect(() => {
        setValidFName(USER_REGEX.test(firstName));
    }, [firstName])
 
    useEffect(() => {
        setValidLName(USER1_REGEX.test(lastName));
    }, [lastName])
 
    useEffect(() => {
        setValidemail(EMAIL_REGEX.test(email));
    }, [email])
 
    useEffect(() => {
        setValidpassword(PWD_REGEX.test(password));
        setValidMatch(password === matchpassword);
    }, [password, matchpassword])
 
    useEffect(() => {
        setErrMsg('');
    }, [firstName, lastName, email, password, matchpassword])
 
        const handleSubmit = async (e) => {
            e.preventDefault();
            const v1 = USER_REGEX.test(firstName);
            const v11 = USER1_REGEX.test(lastName);
            const v2 = PWD_REGEX.test(password);
            const v3 =EMAIL_REGEX.test(email);
            if (!v1 || !v2 || !v11 || !v3) {
                setErrMsg("Invalid Entry");
                return;
            }
            try {
                const userData = await handleRegisterLogin(firstName,lastName,dateOfBirth,email, password);
                // Registration successful, userData contains user information
                console.log(userData); // Example: { userId: "123456", firstName: "John", ... }
            
                // Perform actions such as displaying a success message, updating state, or navigating
                // For example, you can navigate to the login page after successful registration
                // navigate('/login');
                setSuccess(true);
            
                // Clear form fields after successful registration if needed
                setfirstName('');
                setlastName('');
                setDateOfBirth('');
                setemail('');
                setpassword('');
                setMatchpassword('');
            
            } catch (err) {
                // Handle registration errors
                console.error("Registration failed", err);
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
                    errRef.current.focus();
                }
            }
   
      }
 
    return (
        <>
            {success ? (
                
                    
                    navigate('/logintest')
                                    
            ) : (
                <div>
 
                    <div className="error-container">
                        <p id="uidnote1" className={firstName && !validFName ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                             <p className="warning">First Name</p> <br />
                            4 to 24 characters.<br />
                            Must begin with a letter.<br />
                            Letters, numbers, underscores, hyphens allowed.
                        </p>
 
                        <p id="uidnote2" className={ lastName && !validLName ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            <p className="warning"> Last Name </p><br />
                            4 to 24 characters.<br />
                            Must begin with a letter.<br />
                            Letters, numbers, underscores, hyphens allowed.
                        </p>
 
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
 
                        <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            <p className="warning">Confirm Password</p> <br />
                            Must match the first password input field.
                        </p>
                    </div>
                <section>
                    <div className="error">
                        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    </div>
                    <div className="heading">
                        <h1>Register</h1>
                    </div>
                    <div className="form">
 
                        <form onSubmit={handleSubmit}>
                            <div className="form-grp">
                                <label htmlFor="firstName">
                                    firstName:
                                    {/* <FontAwesomeIcon icon={faCheck} className={validFName ? "valid" : "hide"} />
                                    <FontAwesomeIcon icon={faTimes} className={validFName || !firstName ? "hide" : "invalid"} /> */}
                                </label>
                                <input
                                    type="text"
                                    id="firstName"
                                    ref={FirstRef}
                                    autoComplete="off"
                                    onChange={(e) => setfirstName(e.target.value)}
                                    value={firstName}
                                    required
                                    aria-invalid={validFName ? "false" : "true"}
                                    aria-describedby="uidnote1"
                                    onFocus={() => setFnameFocus(true)}
                                    onBlur={() => setFnameFocus(false)}
                                    />
 
                                {/* <p id="uidnote1" className={FnameFocus && firstName && !validFName ? "instructions" : "offscreen"}> */}
                                {/* <p id="uidnote1" className={ firstName && !validFName ? "instructions" : "offscreen"}>
                                    <FontAwesomeIcon icon={faInfoCircle} />
                                    4 to 24 characters.<br />
                                    Must begin with a letter.<br />
                                    Letters, numbers, underscores, hyphens allowed.
                                </p> */}
                            </div>
 
                            <div className="form-grp">
 
                                <label htmlFor="lastName">
                                    lastName:
                                    {/* <FontAwesomeIcon icon={faCheck} className={validLName ? "valid" : "hide"} />
                                    <FontAwesomeIcon icon={faTimes} className={validLName || !lastName ? "hide" : "invalid"} /> */}
                                </label>
                                <input
                                    type="text"
                                    id="lastName"
                                    ref={LastRef}
                                    autoComplete="off"
                                    onChange={(e) => setlastName(e.target.value)}
                                    value={lastName}
                                    required
                                    aria-invalid={validLName ? "false" : "true"}
                                    aria-describedby="uidnote2"
                                    onFocus={() => setLnameFocus(true)}
                                    onBlur={() => setLnameFocus(false)}
                                    />
                                {/* <p id="uidnote2" className={LnameFocus && lastName && !validLName ? "instructions" : "offscreen"}>
                                    <FontAwesomeIcon icon={faInfoCircle} />
                                    4 to 24 characters.<br />
                                    Must begin with a letter.<br />
                                    Letters, numbers, underscores, hyphens allowed.
                                </p> */}
                            </div>
 
                            <div className="form-grp">
 
                                <label htmlFor="Dob">
                                    Date of Birth:
                                    {/* <FontAwesomeIcon icon={faCheck} className={validemail ? "valid" : "hide"} />
                                    <FontAwesomeIcon icon={faTimes} className={validemail || !email ? "hide" : "invalid"} /> */}
                                </label>
                                <input
                                    type="date"
                                    id="dob"
                                    autoComplete="off"
                                    name="date"
                                    value={dateOfBirth}
                                    onChange={(event)=>setDateOfBirth(event.target.value)}
                                    // onChange={(e) => setemail(e.target.value)}
                                    // value={email}
                                    // required
                                    // aria-invalid={validemail ? "false" : "true"}
                                    // aria-describedby="enote"
                                    // onFocus={() => setemailFocus(true)}
                                    // onBlur={() => setemailFocus(false)}
                                    />
                                {/* <p id="enote" className={emailFocus && email && !validemail ? "instructions" : "offscreen"}>
                                    <FontAwesomeIcon icon={faExclamationCircle} />
                                    Enter valid email
                                </p> */}
                            </div>
 
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
                                    placeholder="email"
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
 
                            <div className="form-grp">
 
                                <label htmlFor="confirm_password">
                                    Confirm Password:
                                    <FontAwesomeIcon icon={faCheck} className={validMatch && matchpassword ? "valid" : "hide"} />
                                    <FontAwesomeIcon icon={faTimes} className={validMatch || !matchpassword ? "hide" : "invalid"} />
                                </label>
                                <input
                                    type="password"
                                    id="confirm_password"
                                    onChange={(e) => setMatchpassword(e.target.value)}
                                    value={matchpassword}
                                    required
                                    aria-invalid={validMatch ? "false" : "true"}
                                    aria-describedby="confirmnote"
                                    onFocus={() => setMatchFocus(true)}
                                    onBlur={() => setMatchFocus(false)}
                                    />
                                {/* <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                                    <FontAwesomeIcon icon={faInfoCircle} />
                                    Must match the first password input field.
                                </p> */}
                            </div>
 
                            <button disabled={!validFName || !validLName || !validpassword || !validMatch ? true : false} className="Sign-up">Sign Up</button>
                        </form>
                        <hr />
                        <div className="sso">
                            
                        </div>
                        <div className="signIn">
                            Already registered?
                            <span className="line">
                                {/* router link  */}
                                <Link to='/blank'>Sign In</Link>
                            </span>
                        </div>
                    </div>
                </section>
            </div>
            )}
        </>
    )
}
 
 
export default SignUp;