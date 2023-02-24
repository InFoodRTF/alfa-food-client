import {action, makeAutoObservable, observable} from "mobx";
import NotAuthUser from "../Model/Role/NotAuthUser";
import IUser from "../Model/Interface/IUser";
import AuthKey from "../Model/AuthKey";
import IApiAuth from "../Api/IApiAuth";
import ApiClient from "../Api/ApiClient";
class UserStore {
    @observable
    public User: IUser = new NotAuthUser();
    @observable
    public Api: IApiAuth = new ApiClient();
    constructor() {
        makeAutoObservable(this)
    }

    @action
    async AuthUserByToken() {
        this.User = await this.Api.TryGetUser(AuthKey.GetFromLocalStorage());
    }

}

export default UserStore;