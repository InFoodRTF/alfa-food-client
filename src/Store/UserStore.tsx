import Token from "../Model/Token";
import apiClient from "../Api/ApiClient";
import {action, makeAutoObservable, observable} from "mobx";
import Users from "../Model/TypeUsers";
import NotAuthUser from "../Model/Role/NotAuthUser";

class UserStore {
    @observable
    public Token: Token = new Token();
    @observable
    public User: Users = new NotAuthUser();

    constructor() {
        makeAutoObservable(this)
    }

    @action
    async AuthUserByToken() {
        this.Token.GetTokenByLocalStorage();
        this.User = await apiClient.TryGetUser(this.Token);
    }

}

export default UserStore;