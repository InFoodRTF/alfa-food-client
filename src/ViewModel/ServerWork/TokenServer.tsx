import AuthUser from "../AuthUser";
import apiClient from "../../Api/ApiClient";
import IToken from "../Interface/IToken";
import statusType from "../../Api/Response/StatusResponse";

export default abstract class TokenServer implements IToken{
    public token: string = '';

        async GetTokenAuth(user: AuthUser) {
        let {token, statusResponse} = await apiClient.TryGetToken(user);
        this.token = token.token;
        localStorage.setItem("token", JSON.stringify(this.token))
    }
}