import Token from "../Model/Token";
import Parent from "../Model/Parent";
import parent from "../Model/Parent";
import apiClient from "../Api/ApiClient";
import {action, makeAutoObservable, observable} from "mobx";
import Users from "../Model/TypeUsers";
import IUser from "../Model/Interface/IUser";
import Role from "../Model/Enum/Role";
import cooker from "../Model/Cooker";

class UserStore {
    @observable
    public Token: Token = new Token();
    @observable
    public User: Users = new Parent();

    constructor() {
        makeAutoObservable(this)
    }


    @action
    async AuthUserByToken() {
        this.Token.GetTokenByLocalStorage();
        const user = await apiClient.TryGetUser(this.Token);
        this.Recognize(user)

        console.log(this.User.first_name)
    }

    private Recognize(user: IUser) {
        if (user.role === Role.Parent) {
            this.User = user as parent;
            console.log("ей это родитель")
        }

        if (user.role === Role.Cooker) {
            this.User = user as cooker;
        }
    }
}

export default UserStore;