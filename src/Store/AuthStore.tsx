import Token from "../Model/Token";
import StatusResponse from "../Api/Response/StatusResponse";
import AuthUser from "../Model/AuthUser";
import {action, makeAutoObservable, observable} from "mobx";
import ApiClient from "../Api/ApiClient";
import statusResponse from "../Api/Response/StatusResponse";
import IToken from "../Model/Interface/IToken";

class AuthStore {
    @observable
    public ResponseStatus: StatusResponse = statusResponse.Wait;
    @observable
    public User: AuthUser = new AuthUser();
    @observable
    public Token: IToken = new Token();

    constructor() {
        makeAutoObservable(this)
    }
    
    @action
    async UserAuth(): Promise<void> {
        let {token, statusResponse} = await ApiClient.TryGetToken(this.User);
        localStorage.setItem("token", token.token!)
        console.log("вышли из запроса токена")

        this.Token.token = token.token;
        this.ResponseStatus = statusResponse
    }
}

export default AuthStore;