import IToken from "../Model/Interface/IToken";
import axios, {AxiosError, AxiosResponse} from "axios";

export type WithError<T> = {
    data: T,
    status: number
}
export default abstract class ApiRequest {  // еще один абстрк ради абстракт, как мне кажется, но убрать это 10 сек



    protected async GetByToken<T>(url: string, token: IToken): Promise<AxiosResponse> {
        return await axios.get<T[]>(url, {headers: {Authorization: `token ${token.token}`}})
    }


    // а вдруг придумаю, как это сделать универсальным объектом
    protected async GetPostRespWithResult<TGet,TPost>(url: string, dataPost: TPost) {
        return await axios.post<TGet>(url, dataPost)
            .catch(this.CatchError<TGet>)
            .then(resp => resp);
    }

    //TODO реализовать более крутой CatchError
    protected CatchError<T>(error: AxiosError<T, any>): WithError<T> {
        const data = error.response!.data;
        console.log('запрос не прошел', data)
        return {data: data, status: error.response!.status}
    }
}

// я верю в то, что это потом будет иметь более сложную структуру !!