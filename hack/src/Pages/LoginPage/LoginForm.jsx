import React, { useState } from 'react';
import './LoginForm.css';
import { useNavigate } from 'react-router-dom';
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { FaEyeSlash, FaEye } from 'react-icons/fa';
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBCheckbox
} from 'mdb-react-ui-kit';
// import OTPInput from '../Email/email';
import { handleLogin } from '../../Components/AxiosConfiguration/BackendData/data';
function LoginForm({ isLoggedIn, handleLogin1 }) {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setpassword] = useState('');
//     const handleLoginClick = () => {
  
//   };
 
  if (isLoggedIn) {
    navigate('/')
  }
 
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };
 
    const [validemail, setValidEmail] = useState(false);
    const [EmailFocus, setEmailFocus] = useState(false);
 
    const [validpassword, setValidpassword] = useState(false);
    const [passwordFocus, setpasswordFocus] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
 
    const handlePasswordChange = (e) => {
        setpassword(e.target.value);
    };
    const handleSignin = () =>{
        navigate("/home")
    }
 
    const [isModalOpen, setModalOpen] = useState(false);
   
  const [showChild, setShowChild] = useState(false);
 
 
    const openModal = () => {
        setModalOpen(true);
    };
 
    const closeModal = () => {
        setModalOpen(false);
    };
 
    const handleClick = () => {     setShowChild(true);   };
 
      const handleLoginClick = async() => {
        handleLogin1();
       
 
 
        try{
          await handleLogin(email,password)
          .then(() =>{navigate("/home")
            })
             .catch(()=>{alert("login failed")})
        }catch{
          navigate('/')
        }
      }
 
    return (
        // <MDBContainer fluid>
        //     <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        //         <MDBCol col='12'>
        //             <MDBCard className='bg-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '500px' }}>
        //                 <MDBCardBody className='p-5 w-100 d-flex flex-column'>
        //                     <h2 className="fw-bold mb-2 text-center">Login</h2>
        //                     {/* <p className="text-white-50 mb-3">Please enter your login and password!</p> */}
        //                     <MDBInput wrapperClass='mb-4 w-100' label='Email address' id='formControlEmail' type='email' size="lg" onChange={handleEmailChange} />
        //                     <MDBInput wrapperClass='mb-4 w-100' label='Password' id='formControlPswd' type='password' size="lg" onChange={handlePasswordChange} />
        //                     <MDBCheckbox name='flexCheck' id='flexCheckDefault' className='mb-4' label='Remember password' />
        //                     <button>Login</button>
        //                     {/* <button onClick={handleLoginClick}>
        //                         {<div>
        //                             Login
        //                         </div>}
        //                     </button> */}
        //                     <p class="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <a href="/signup"
        //                         class="link-danger">Register</a></p>
 
        //                 </MDBCardBody>
        //             </MDBCard>
        //         </MDBCol>
        //     </MDBRow>
        // </MDBContainer>
 
        <div>
 
            <div className="error-container">
 
                <p id="enote" className={email && !validemail ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faExclamationCircle} />
                    <p className="warning">Email</p> <br />
                    Enter valid Email
                </p>
 
                {/* <p id="passwordnote" className={passwordFocus && !validpassword ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    <p className="warning">Password</p> <br />
                    8 to 24 characters.<br />
                    Must include uppercase and lowercase letters, a number and a special character.<br />
                    Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                </p> */}
 
 
            </div>
 
            <section>
                <div className="heading">
                    <h1>Login</h1>
                </div>
                <div className="formLogin">
                    <form>
                        <div className="form-grp-login">
 
                            <label htmlFor="Email">
                                Email:
                            </label>
                            <input
                                type="email"
                                id="Email"
                                autoComplete="off"
                                placeholder="Email"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                required
                                aria-invalid={validemail ? "false" : "true"}
                                aria-describedby="enote"
                                onFocus={() => setEmailFocus(true)}
                                onBlur={() => setEmailFocus(false)}
                            />
                            {/* <p id="enote" className={EmailFocus && Email && !validemail ? "instructions" : "offscreen"}>
                                    <FontAwesomeIcon icon={faExclamationCircle} />
                                    Enter valid Email
                                </p> */}
                        </div>
                        <div className="form-grp-login">
 
                            <label htmlFor="password">
                                Password:
 
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
 
                        <div className="form-grp-check">
                            <input type="checkbox" id="password" name="password" value="Bike" />
                            <label for="password"> Remember Me.</label>
                        </div>
 
                        <div className="forgot-pass">
                            <button onClick={openModal}>Forgot Password?</button>
                        </div>
 
                        <button onClick={handleLoginClick} className="Sign-up">Sign In</button>
                    </form>
                    <hr />
                    <div className="sso"></div>
                    <div className="signIn">
                        Don't have an account?
                        <span className="line">
                            {/* router link  */}
                            <>Register</>
                        </span>
                    </div>
                </div>
            </section>
 
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <span className="close-btn" onClick={closeModal}>
                            &times;
                        </span>
                        <div className="head">
                            <h3>Forgot your Password?</h3>
                            <p>Enter your registered email to receive a password reset link.</p>
                        </div>
 
                        <form action="">
                            <div className="from-grp-modal">
                                <label htmlFor="modal-Email">
                                    Email:
                                </label>
                                <input
                                    type="email"
                                    id="modal-Email"
                                    autoComplete="off"
                                    placeholder="Email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    required
                                    aria-invalid={validemail ? "false" : "true"}
                                    aria-describedby="enote"
                                    onFocus={() => setEmailFocus(true)}
                                    onBlur={() => setEmailFocus(false)}
                                />
                            </div>
 
                            <button type="submit" >Submit</button>
                            {/* <button onClick={handleClick}>Open Child</button>      {showChild && <OTPInput />}     */}
                        </form>
 
                    </div>
                </div>
            )}
        </div >
    );
}
 
export default LoginForm