import React from 'react';
import "./welcome.css";
import logo_waatcho from "../../assets/logo_waatcho.png";


function Welcome() {



    return (
        <div>
            <div id="stars"></div>
            <div id='title'>
                <span>
                    WELCOME TO WAATCHO
                </span>
                <br />
                <span>
                    Watch videos non-stop
                </span>
                <br />
            </div>
            <div className=" text-center zoom-in-out-box">
                <img src={logo_waatcho} alt="logo_waatcho" width="100" height="100"/>
            </div>
        </div>
    )
}

export default Welcome;
