import axios, {AxiosError} from "axios";
import IToken from "../Model/Interface/IToken";
import IUser from "../Model/Interface/IUser";
import ApiRequest from "./ApiRequest";


// концепия интересная, но пока не могу сказать, не мусорный ли это просто код
export type ResponseData<T> = {
    data: T,
    status: number;
}

class ApiClient extends ApiRequest {

    async PostDataWithResult<TGet, TPost>(url: string, dataPost: TPost): Promise<ResponseData<TGet>> {
        const resp = await axios.post<TGet>("/api/"+url, dataPost)
            .catch(this.CatchError<TGet>)
            .then(resp => resp);

        return {data: resp.data, status: resp.status};
    }

    // TODO ужас здесь повторяется код!!!
    async PostDataWithResultByToken<TGet, TPost>(url: string, token: IToken, dataPost: TPost): Promise<ResponseData<TGet>> {
        const resp = await axios.post("/api/"+url, dataPost, {headers: {Authorization: `token ${token.token}`}})
            .catch(this.CatchError<TGet>)
            .then(resp => resp);

        return {data: resp.data, status: resp.status};
    }

    // TODo переделеать, в более универальный случай
    async GetEntityByToken<TGet>(token: IToken, url: string): Promise<TGet> {
        try {
            const response = await this.GetByToken<TGet>("/api/"+url, token)
            console.log("все окей!")
            return response.data
        } catch (err) {
            const e = err as AxiosError<IUser, any>;
            throw new Error(`Данные не получены ${e.status}`);
        }
    }
}


export default ApiClient;