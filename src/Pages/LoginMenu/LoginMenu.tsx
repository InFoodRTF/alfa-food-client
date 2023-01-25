import React from "react";
import AuthUser from "../../ViewModel/AuthUser";
import InputLogin from "../../componets/InputLogin/InputLogin";

class LoginMenu extends React.Component{

    render() {
        return (
            <div>
                <InputLogin user={new AuthUser()}/>

            </div>
        );
    }
}