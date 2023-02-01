import AuthUser from "../AuthUser";
import apiClient from "../../Api/ApiClient";
import IToken from "../Interface/IToken";
import statusType from "../../Api/Response/StatusResponse";
import IUser from "../Interface/IUser";

export default abstract class TokenServer implements IToken{
    public token: string = '';


    async GetUser() : Promise<IUser> {
       const user = await apiClient.TryGetUser(this);

       return user
    }
}