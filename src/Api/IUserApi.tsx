import IToken from "../Model/Interface/IToken";
import StatusResponse from "./StatusResponse";
import IUser from "../Model/Interface/IUser";
import AuthUser from "../Model/AuthUser";
import Student from "../Model/Student";

export default interface IUserApi {

    TryGetToken(user: AuthUser): Promise<{ token: IToken, statusResponse: StatusResponse }> ; // если я так начал мутить то и это вроде здесь лишнее
    TryGetUser(token: IToken): Promise<IUser> ;
    GetEntity<TE>(token: IToken, ulr: string): Promise<TE>;
}
