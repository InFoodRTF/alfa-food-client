import AuthUser from "../AuthUser";
import apiClient from "../../Api/ApiClient";
import IToken from "../Interface/IToken";
import statusType from "../../Api/Response/StatusResponse";

export default abstract class TokenServer implements IToken{
    public token: string = '';

}