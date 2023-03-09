import React from "react";
import axios, {AxiosError} from "axios";
import IToken from "../Model/Interface/IToken";
import StatusResponse from "./StatusResponse/StatusResponse";
import IUser from "../Model/Interface/IUser";
import AuthUser from "../Model/AuthUser";
import Order from "../Model/Order/Order";

class ApiClient {

    async TryGetToken(user: AuthUser): Promise<{ token: IToken, statusResponse: StatusResponse }> {
        try {
            let response = await axios.post<IToken>("auth/login/", user)
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
            let response = await axios.get<IUser>("/user/", {headers: {Authorization: `token ${token.token}`}});
            console.log("Юзер получен")
            return response.data
        } catch (err) {
            const e = err as AxiosError<IUser, any>;
            // return new NotAuthUser(); пока на уровне идей, вместо исключение будем получать страницу типа 401
            throw new Error(`юзер не получен ${e.status}`);
        }
    }

    async GetOrders(token: IToken, count: number): Promise<{ orders: Order[], totalCount: number }> {
        try {
            let response = await axios.get<Order[]>(`/orders/?limit=2&offset=${count}`, {headers: {Authorization: `token ${token.token}`}})
            console.log('заказы получены')
            return {orders: response.data, totalCount: Number(response.headers["orders-total-count"])}; // а может просто orders-total
        } catch (err) {
            const e = err as AxiosError<Order[], null>
            console.log('что-то пошло не так')
            return {orders: e.response!.data, totalCount: Number(e.response!.headers["orders-total-count"])}
        }
    }
}


export default new ApiClient();