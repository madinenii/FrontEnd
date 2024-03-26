import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';

import SignUp from './Pages/RegistrationForm/SignUp';


import ParticipantDashboard from './Pages/UserDashboard/ParticipantDashboard';

import JudgeDashboard from './Pages/JudgeDashboard/JudgeDashboard';
import LoginTest from './Pages/LoginPage/LoginTest';

import Register from './Pages/RegistrationForm/Register';




// import MyComponent from './Pages/PanelistDashboard/PanelistDashboard';
import Home from './Pages/Home/Home';
import MyComponent from './Pages/PanelistDashboard/PanelistDashboard';
import PanelistPage from './Pages/PanelistPage';
import IdeaSubmissionPage from './Pages/UserDashboard/IdeaSubmission';
import UserProfile from './Pages/UserProfile/UserProfile';


function App() {
    const [userRole, setUserRole] = useState('');

    return (
        <Router>
            <Routes>
                <Route path='/' element={<MyComponent/>}/>
                <Route path ='/Ideasubmission' element={<IdeaSubmissionPage/>}/>
                <Route path='/Teamaddition' element={<UserProfile/>}/>
                <Route path='/PanelistPage' element={<PanelistPage/>}/>
                <Route path='/logintest' element={<LoginTest setUserRole={setUserRole} />} />
                <Route path='/SignUp' element={<SignUp />} />
                {/* <Route path='/Main' element={<Main />} /> */}
                <Route path='/participantdashboard'element={<ParticipantDashboard/>}></Route>
                {/* <Route path="/userdashboard" element={<UserDashboard/>}/> */}
                {/* <Route path='/Home' element={<Home/>}/> */}
                // <Route path='/panelistdashboard' element={<MyComponent/>}/>
                <Route path='/judgedashboard' element={<JudgeDashboard/>}/>
                <Route path='/register'element={<Register/>}></Route>
                {/* <Route path='/sample' element={<Sample/>}></Route> */}
                {/* <Route
                    path="/participant-dashboard"
                    element={
                        <PrivateRoute
                            component={ParticipantDashboard}
                            roles={['participant']}
                            userRole={userRole}
                        />
                    }
                /> */}
                 {/* <Route
                    path="/panelist-dashboard"
                    element={
                        <PrivateRoute
                            component={PanelistDashboard}
                            roles={['panelist']}
                            userRole={userRole}
                        />
                    }
                /> */}
                            {/* <Route
                    path="/judge-dashboard"
                    element={
                        <PrivateRoute
                            component={JudgeDashboard}
                            roles={['judge']}
                            userRole={userRole}
                        />
                    }
                /> */}

            </Routes>
        </Router>
    );
}

export default App;