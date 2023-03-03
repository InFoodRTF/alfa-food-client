import {action, makeAutoObservable, makeObservable, observable} from "mobx";
import NotAuthUser from "../Model/Role/NotAuthUser";
import IUser from "../Model/Interface/IUser";
import Requests from "../Api/Requests";
import baseStoreToken from "./BaseStoreToken";

class UserStore extends baseStoreToken {
    @observable
    public User: IUser = new NotAuthUser();
    private urlGetUser = "/user/"

    constructor() {
        super()
        makeObservable(this)
    }

    @action
    async AuthByToken() {
        this.User = await this.GetData(this.urlGetUser);
    }
}

export default UserStore;