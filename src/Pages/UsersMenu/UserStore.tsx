import {action, makeObservable, observable} from "mobx";
import NotAuthUser from "../../Model/Role/NotAuthUser";
import IUser from "../../Model/Interface/IUser";
import baseStoreToken from "../../Api/StoreAdapterApi";
import StoreAdapterApi from "../../Api/StoreAdapterApi";

class UserStore extends StoreAdapterApi {
    @observable
    public User: IUser = new NotAuthUser();
    public loading: boolean = true;
    private urlGetUser = "/user/"

    constructor() {
        super()
        makeObservable(this)
    }

    @action
    async AuthByToken() {
        this.User = await this.getDataByToken(this.urlGetUser);
    }

    public ChangeLoad(){
        this.loading = !this.loading
    }
}

export default UserStore;