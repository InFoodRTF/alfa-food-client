import IToken from "../Model/Interface/IToken";
import axios, {AxiosResponse} from "axios";

export default abstract class ApiRequest {  // еще один абстрк ради абстракт, как мне кажется, но убрать это 10 сек
    protected async GetByToken<T>(url: string, token: IToken): Promise<AxiosResponse> {
        return await axios.get<T[]>(url, {headers: {Authorization: `token ${token.token}`}})
    }
}

// я верю в то, что это потом будет иметь более сложную структуру !!