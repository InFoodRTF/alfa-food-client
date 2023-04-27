import StatusResponse from "../../Api/StatusResponse";
import AuthUser from "./Model/AuthUser";
import {action, makeObservable, observable} from "mobx";
import statusResponse from "../../Api/StatusResponse";
import AuthKey from "../../Model/AuthKey";
import IToken from "../../Model/Interface/IToken";
import StoreAdapterApi from "../../Api/StoreAdapterApi";
import {ResponseData} from "../../Api/ApiClient";

class AuthStore extends StoreAdapterApi {
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
        const resp : ResponseData<IToken> = await this.PostWithResult<IToken, AuthUser>(this.url, this.User);
        AuthKey.LoadToLocalStorage(resp.data);
        this.ResponseStatus = resp.status;
    }
}

export default AuthStore;