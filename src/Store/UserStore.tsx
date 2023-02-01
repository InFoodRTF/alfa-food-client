import IUser from "../Model/Interface/IUser";
import Token from "../Model/Token";
import Parent from "../Model/Parent";
import apiClient from "../Api/ApiClient";
import {action, computed, makeAutoObservable, observable} from "mobx";

class UserStore {
    @observable
    public Token: Token = new Token();
    @observable
    public User: IUser = new Parent();

    constructor() {
        makeAutoObservable(this)
    }

    @computed
    TokenLocalStorage() {
        if (this.Token.token == null)
            this.Token.GetTokenByLocalStorage();
    }

    @action
    async RecognizeUser() {
        this.TokenLocalStorage();
        this.User = await apiClient.TryGetUser(this.Token);
        console.log(this.User.first_name)
    }
}

export default UserStore;