import IToken from "../Model/Interface/IToken";
import StatusResponse from "./StatusResponse";
import IUser from "../Model/Interface/IUser";
import AuthUser from "../Model/AuthUser";

export default interface IApiAuth {

    TryGetToken(user: AuthUser): Promise<{ token: IToken, statusResponse: StatusResponse }> ;
    TryGetUser(token: IToken): Promise<IUser> ;
}
