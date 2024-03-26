import {GoogleLogin} from 'react-google-login';

const clientId = "369265026491-slknr9saul13e1006bj9gkv0udr668tv.apps.googleusercontent.com";

function Login(){
    const onSuccess = (res) => {
        console.log("LOGIN SUCCESS! Current user: ", res.profileObj);
    }
    const onFailure = (res) => {
        console.log("LOGIN FAILED! res: ", res);
    }
    return(
        <div id = "signInButton">
            <GoogleLogin
            clientId={clientId}
            buttonText={"Login"}
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={'single-host-origin'}
            isSignedIn={true}
            />
        </div>
    )
}
export default Login;