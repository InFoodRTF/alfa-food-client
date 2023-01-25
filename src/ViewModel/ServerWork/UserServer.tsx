import IAuthUser from "../Interface/IAuthUser";
import {makeObservable, observable} from "mobx";
import apiClient from "../../Api/ApiClient";
import IToken from "../Interface/IToken";

abstract class UserWorkServer implements IAuthUser{
    password: string = '';
    username: string = '';

    protected constructor() {
        makeObservable(this, {
            password: observable,
            username: observable,
        })
    }

    async TryAuth(): Promise<{ token: IToken }>{
        let token = await apiClient.GetToken(user);
        this.token = token.token;
        this.responseStatus = token.responseStatus;
        localStorage.setItem("token", JSON.stringify(this.token))
        return token;
    }


}

export default UserWorkServer;