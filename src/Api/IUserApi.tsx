import IToken from "../Model/Interface/IToken";
import StatusResponse from "./StatusResponse";
import AuthUser from "../Model/AuthUser";

export default interface IUserApi {

    TryGetToken(user: AuthUser): Promise<{ token: IToken, statusResponse: StatusResponse }> ; // если я так начал мутить то и это вроде здесь лишнее
    GetEntity<TE>(token: IToken, ulr: string): Promise<TE>;
}
