import React from "react";
import InputLogin from "../../componets/InputLogin/InputLogin";
import {inject, observer} from "mobx-react";
import AuthStore from "../../Store/AuthStore";
import {Link, Navigate} from "react-router-dom";
import statusResponse from "../../Api/StatusResponse";
import httpPages from "../HttpPages";

type props = {
    authStore: AuthStore;
}

@inject("authStore")
@observer
export default class LoginMenu extends React.Component {
    get injected(): props {
        return this.props as props;
    }


    render() {
        const {authStore} = this.injected;
        return (
            <div>
                <InputLogin user={authStore.User}/>
                <input type='button' onClick={() => authStore.UserAuth()}/>
                <Link to={httpPages.Profile}>
                    <button type="button"> toProfile</button>
                </Link>
                {authStore.ResponseStatus === statusResponse.BadRequest && <p>не прошел запрос</p>}
                {authStore.ResponseStatus === statusResponse.NotServer && <p>нет коннекта </p>}
                {authStore.ResponseStatus === statusResponse.Ok && <Navigate to={httpPages.Profile}/>}
                {authStore.ResponseStatus === statusResponse.ServerNotFound && <p>не прошел запрос</p>}
            </div>
        );
    }
}