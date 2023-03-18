import IToken from "../Model/Interface/IToken";
import {AxiosError} from "axios/index";
import ApiRequest from "../Api/ApiRequest";

abstract class PaginationReq extends ApiRequest {

    async GetDataByPagination<T>(token: IToken, url: string): Promise<{ newData: T[], totalLoad: number }> {
        try {
            let response = await this.GetByToken<T[]>(url, token)
            console.log('Данные получены c пагинаций')
            return {newData: response.data, totalLoad: Number(response.headers["orders-total-count"])}; // а может просто orders-total
        } catch (err) {
            const e = err as AxiosError<T[], null>
            console.log('что-то пошло не так')
            throw new Error(`ошибка пагинаций ${e}`)
        }
    }
}
export default PaginationReq