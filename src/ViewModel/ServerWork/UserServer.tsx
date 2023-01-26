import IAuthUser from "../Interface/IAuthUser";
import {makeObservable, observable} from "mobx";
import apiClient from "../../Api/ApiClient";
import StatusResponse from "../../Api/Response/StatusResponse";

abstract class UserServer implements IAuthUser {
    password: string = '';
    username: string = '';

    protected constructor() {
        makeObservable(this, {
            password: observable,
            username: observable,
        })
    }
}

export default UserServer;