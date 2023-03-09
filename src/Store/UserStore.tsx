import apiClient from "../Api/ApiClient";
import {action, makeAutoObservable, observable} from "mobx";
import NotAuthUser from "../Model/Role/NotAuthUser";
import IUser from "../Model/Interface/IUser";
import AuthKey from "../Model/AuthKey";
class UserStore {
    @observable
    public User: IUser = new NotAuthUser();

    constructor() {
        makeAutoObservable(this)
    }

    @action
    async AuthUserByToken() {
        AuthKey.ExtractFromLocalStorage();
        this.User = await apiClient.TryGetUser(AuthKey);
    }

}

export default UserStore;