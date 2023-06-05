import axios, {AxiosError} from "axios";
import IToken from "../Model/Interface/IToken";
import IUser from "../Model/Interface/IUser";
import ApiRequest from "./ApiRequest";


// концепия интересная, но пока не могу сказать, не мусорный ли это просто код
export type ResponseData<T> = {
    data: T,
    status: number;
}

// TODO ужас здесь повторяется код!!!
class ApiClient extends ApiRequest {

    async PostDataWithResult<TGet, TPost>(url: string, dataPost: TPost): Promise<ResponseData<TGet>> {
        const resp = await axios.post<TGet>(url, dataPost)
            .catch(this.CatchError<TGet>)
            .then(resp => resp);

        return {data: resp.data, status: resp.status};
    }

    async PatchDataWithResult<TGet, TPost>(url: string, token: IToken, dataPost: TPost): Promise<ResponseData<TGet>> { // todo убери токен в правую часть аргуменутом плз!!!
        const resp = await axios.patch(url, dataPost, {headers: {Authorization: `token ${token.token}`}})
            .catch(this.CatchError<TGet>)
            .then(resp => resp);

        return {data: resp.data, status: resp.status};
    }

    async PostDataWithResultByToken<TGet, TPost>(url: string, token: IToken, dataPost: TPost): Promise<ResponseData<TGet>> {
        const resp = await axios.post(url, dataPost, {headers: {Authorization: `token ${token.token}`}})
            .catch(this.CatchError<TGet>)
            .then(resp => resp);

        return {data: resp.data, status: resp.status};
    }

    // TODo переделеать, в более универальный случай
    async GetEntityByToken<TGet>(token: IToken, url: string): Promise<TGet> {
        try {
            const response = await this.GetByToken<TGet>(url, token)
            console.log("все окей!", response)
            return response.data
        } catch (err) {
            const e = err as AxiosError<TGet, any>;
            return e.response!.data;
        }
    }
}


export default ApiClient;