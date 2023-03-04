import axios, {AxiosError} from "axios";
import IToken from "../Model/Interface/IToken";
import StatusResponse from "./StatusResponse";
import IUser from "../Model/Interface/IUser";
import IPagination from "../Lib/IPaginatonLoad";
import ApiRequest from "./ApiRequest";

// кринж handlera ошибок просто бл нету - очень удобно искать ошибки прям капец
class ApiClient extends ApiRequest implements IPagination {

    async GetDataWithResult<TGet, TPost>(url: string, user: TPost): Promise<{ token: TGet, statusResponse: StatusResponse }> {
        try {
            let response = await axios.post<TGet>(url, user)
            console.log('запрос прошел')
            return {token: response.data, statusResponse: response.status};
        } catch (err) {
            const e = err as AxiosError<TGet, any>;
            console.log('запрос не прошел')
            return {token: e.response!.data, statusResponse: e.response!.status}  // можно написать обрабочек ошибок типа hadlerError как в angular
        }
    }

    async GetDataByPagination<T>(token: IToken, url: string): Promise<{ newData: T[], totalLoad: number }> {
        try {
            let response = await this.GetByToken<T[]>(url, token)
            console.log('Данные получены c пагинаций')
            return {newData: response.data, totalLoad: Number(response.headers["orders-total-count"])}; // а может просто orders-total
        } catch (err) {
            const e = err as AxiosError<T[], null>
            console.log('что-то пошло не так')
            return {newData: e.response!.data, totalLoad: Number(e.response!.headers["orders-total-count"])}
        }
    }

    async GetEntity<TE>(token: IToken, url: string): Promise<TE> {
        try {
            let response = await this.GetByToken<TE>(url, token)
            console.log("все окей!")
            return response.data
        } catch (err) {
            const e = err as AxiosError<IUser, any>;
            throw new Error(`юзер не получен ${e.status}`);
        }
    }
}


export default ApiClient;