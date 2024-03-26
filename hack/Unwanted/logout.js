import {GoogleLogout} from 'react-google-login';

const clientId = "369265026491-slknr9saul13e1006bj9gkv0udr668tv.apps.googleusercontent.com";

function Logout() {
    const onSuccess = () => {
        console.log("Log out Successful!");
    }
    return (
        <div id="signOutButton">
            <GoogleLogout
            clientId={clientId}
            buttonText={"Logout"}
            onLogoutSuccess={onSuccess}
            />
        </div>
    )
}

export default Logout;