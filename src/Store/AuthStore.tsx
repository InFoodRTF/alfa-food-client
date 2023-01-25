import React from "react";
import Token from "../ViewModel/Token";
import StatusResponse from "../Api/Response/StatusResponse";
import AuthUser from "../ViewModel/AuthUser";
import {makeAutoObservable} from "mobx";
import ApiClient from "../Api/ApiClient";

class AuthStore {
    constructor(public User: AuthUser, public Token: Token, public ResponseStatus: StatusResponse) {
        makeAutoObservable(this)
    }

    async UserAuth(): Promise<void> {
        let {token, statusResponse} = await ApiClient.TryGetToken(this.User);
        localStorage.setItem("token", JSON.stringify(token.token))

        this.Token.token = token.token;
        this.ResponseStatus = statusResponse
    }
}

export default AuthStore;