import AuthUser from "../AuthUser";
import apiClient from "../../Api/ApiClient";
import IToken from "../Interface/IToken";
import statusType from "../../Api/Response/StatusType";

export default abstract class TokenServer implements IToken{
    public token: string = '';
    public responseStatus: statusType = statusType.Wait;

        async GetTokenAuth(user: AuthUser) {
        let token = await apiClient.GetToken(user);
        this.token = token.token;
        this.responseStatus = token.responseStatus;
        localStorage.setItem("token", JSON.stringify(this.token))
    }
}