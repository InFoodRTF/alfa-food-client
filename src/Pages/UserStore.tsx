import {action, computed, makeObservable, observable, runInAction} from "mobx";
import NotAuthUser from "../Model/Role/NotAuthUser";
import IUser from "../Model/Interface/IUser";
import StoreAdapterApi from "../Api/StoreAdapterApi";
import Requests from "../Api/Requests";

class UserStore extends StoreAdapterApi {
    @observable
    public User: IUser = new NotAuthUser();
    public loading: boolean = true;


    constructor() {
        super()
        makeObservable(this)
    }

    @action
    async AuthByToken() {
        const user  = await this.getDataByToken<IUser>(Requests.User);
        runInAction(() => this.User = user)
    }

    @action
    public LoadIsComplete(){
        this.loading = false;
    }
}

export default UserStore;
