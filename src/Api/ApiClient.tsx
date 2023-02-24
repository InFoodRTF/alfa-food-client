import axios, {AxiosError} from "axios";
import IToken from "../Model/Interface/IToken";
import StatusResponse from "./StatusResponse";
import IUser from "../Model/Interface/IUser";
import AuthUser from "../Model/AuthUser";
import IUserApi from "./IUserApi";
import IPagination from "../Lib/IPaginatonLoad";
import ApiRequest from "./ApiRequest";
import Requests from "./Requests";

class ApiClient extends ApiRequest implements IUserApi, IPagination {

    async TryGetToken(user: AuthUser): Promise<{ token: IToken, statusResponse: StatusResponse }> {
        try {
            let response = await axios.post<IToken>(Requests.GetTokenFromServer, user)
            console.log('запрос прошел')
            return {token: response.data, statusResponse: response.status};
        } catch (err) {
            const e = err as AxiosError<IToken, any>;
            console.log('запрос не прошел')
            return {token: e.response!.data, statusResponse: e.response!.status}
        }
    }

    async TryGetUser(token: IToken): Promise<IUser> {
        try {
            let response = await this.GetByToken<IUser>("/user/", token)
            console.log("Юзер получен")
            return response.data
        } catch (err) {
            const e = err as AxiosError<IUser, any>;
            // return new NotAuthUser(); пока на уровне идей, вместо исключение будем получать страницу типа 401
            throw new Error(`юзер не получен ${e.status}`);
        }
    }

    async GetDataByPagination<T>(token: IToken, url: string): Promise<{ newData: T[], totalLoad: number }> {
        try {
            let response = await this.GetByToken<T[]>(url, token)
            console.log('Данные получены')
            return {newData: response.data, totalLoad: Number(response.headers["orders-total-count"])}; // а может просто orders-total
        } catch (err) {
            const e = err as AxiosError<T[], null>
            console.log('что-то пошло не так')
            return {newData: e.response!.data, totalLoad: Number(e.response!.headers["orders-total-count"])}
        }
    }

    async GetEntity<TE>(token: IToken, url: string): Promise<TE> {
        let response = await this.GetByToken<TE>(url, token);
        return response.data;
    }
}


export default ApiClient;