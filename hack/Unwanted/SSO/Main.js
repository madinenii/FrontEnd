import React from "react";
// import LoginButton from "../Components/login"
import Login from "../Components/login"
import Logout from "../Components/logout";
import { useEffect } from "react";
import {gapi} from 'gapi-script';

const clientId = "369265026491-slknr9saul13e1006bj9gkv0udr668tv.apps.googleusercontent.com";



function Main()
{
    useEffect(() => {
        function start(){
            gapi.client.init({
                clientId: clientId,
                scope:""
            })
        };
        gapi.load('client:auth2',start)
    });
    
    return(
        <div className="Main">
            <Login/>
            <Logout/>
        </div>

    );
}

export default Main;