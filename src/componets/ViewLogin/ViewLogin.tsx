import React from "react";
import UserName from "../UserName/UserName";
import User from "../../ViewModel/User";

class ViewLogin extends React.Component{

    render() {
        return (
            <div>
                <UserName userName={new User()}/>

            </div>
        );
    }
}