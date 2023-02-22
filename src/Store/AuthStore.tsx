import StatusResponse from "../Api/StatusResponse";
import AuthUser from "../Model/AuthUser";
import {action, makeAutoObservable, observable} from "mobx";
import ApiClient from "../Api/ApiClient";
import statusResponse from "../Api/StatusResponse";
import AuthKey from "../Model/AuthKey";

class AuthStore {
    @observable
    public ResponseStatus: StatusResponse = statusResponse.Wait;
    @observable
    public User: AuthUser = new AuthUser();

    constructor() {
        makeAutoObservable(this)
    }

    @action
    async UserAuth(): Promise<void> {
        let {token, statusResponse} = await ApiClient.TryGetToken(this.User);
        AuthKey.LoadToLocalStorage(token);
        this.ResponseStatus = statusResponse
    }
}

export default AuthStore;