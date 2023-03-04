import StatusResponse from "../Api/StatusResponse";
import AuthUser from "../Model/AuthUser";
import {action, makeObservable, observable} from "mobx";
import statusResponse from "../Api/StatusResponse";
import AuthKey from "../Model/AuthKey";
import baseStoreToken from "./BaseStoreToken";
import IToken from "../Model/Interface/IToken";

class AuthStore extends baseStoreToken{
    @observable
    public ResponseStatus: StatusResponse = statusResponse.Wait;
    @observable
    public User: AuthUser = new AuthUser();
    private url: string = "auth/login/"

    constructor() {
        super()
        makeObservable(this)
    }

    @action
    async UserAuth(): Promise<void> {
        let {token, statusResponse} = await this.PostWithResult<IToken, AuthUser>(this.url ,this.User);        // можно зарефакторить
        AuthKey.LoadToLocalStorage(token);
        this.ResponseStatus = statusResponse
    }
}

export default AuthStore;