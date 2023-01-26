import Token from "../ViewModel/Token";
import StatusResponse from "../Api/Response/StatusResponse";
import AuthUser from "../ViewModel/AuthUser";
import {action, makeAutoObservable, observable} from "mobx";
import ApiClient from "../Api/ApiClient";
import statusResponse from "../Api/Response/StatusResponse";

class AuthStore {
    @observable
    public ResponseStatus: StatusResponse = statusResponse.Wait;
    public User: AuthUser = new AuthUser();
    public Token: Token = new Token();

    constructor() {
        makeAutoObservable(this)
    }

    @action
    async UserAuth(): Promise<void> {
        let {token, statusResponse} = await ApiClient.TryGetToken(this.User);
        localStorage.setItem("token", JSON.stringify(token.token))
        console.log("выход")
        this.Token.token = token.token;
        this.ResponseStatus = statusResponse
    }

}

export default AuthStore;