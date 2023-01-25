import React from "react";
import InputLogin from "../../componets/InputLogin/InputLogin";
import {inject} from "mobx-react";
import AuthStore from "../../Store/AuthStore";

type props = {
    authStore : AuthStore;
}

@inject("authStore")
class LoginMenu extends React.Component{
    get injected(): props{
        return this.props as props;
    }

    render() {
        const {authStore} = this.injected;
        return (
            <div>
                <InputLogin user={authStore.User}/>

            </div>
        );
    }
}