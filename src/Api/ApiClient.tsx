import axios, {AxiosError} from "axios";
import IToken from "../Model/Interface/IToken";
import ApiRequest from "./ApiRequest";


// концепия интересная, но пока не могу сказать, не мусорный ли это просто код
export type ResponseData<T> = {
    data: T,
    status: number;
}

// TODO ужас здесь повторяется код!!! catch then убрать определённо
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
    async GetEntityByToken<TGet>(token: IToken, url: string): Promise<TGet> { // как идея, можно выкинуть этоткод за абстрак класс, и брать его для всех методов здесь, тогда повторов не будет
        try {
            const response = await this.GetByToken<TGet>(url, token)
            console.log("все окей!", response)
            return response.data
        } catch (err) {
            const e = err as AxiosError<TGet, any>;
            console.log("запрос с ошибкой", e.response)
            return e.response!.data;
        }
    }

    // пока максимально тупо я на прямую
     DownLoadPfdFile<TPost>(token: IToken, url: string, data: TPost): void {
        axios.post(url, data,{
            responseType: 'blob',
            headers: {Authorization: `token ${token.token}`}// important
        }).then((response) => {
            // create file link in browser's memory
            const href = URL.createObjectURL(response.data);

            // create "a" HTML element with href to file & click
            const link = document.createElement('a');
            link.href = href;
            link.setAttribute('download', 'file.pdf'); //or any other extension
            document.body.appendChild(link);
            link.click();

            // clean up "a" element & remove ObjectURL
            document.body.removeChild(link);
            URL.revokeObjectURL(href);
        });
    }
}


export default ApiClient;