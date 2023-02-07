import React from "react";
import axios, {AxiosError} from "axios";
import IToken from "../Model/Interface/IToken";
import StatusResponse from "./Response/StatusResponse";
import IUser from "../Model/Interface/IUser";
import Token from "../Model/Token";
import AuthUser from "../Model/AuthUser";

class ApiClient {

    async TryGetToken(user: AuthUser): Promise<{ token: IToken, statusResponse: StatusResponse }> {
        try {
            let response = await axios.post<IToken>("auth/login/", user)
            console.log('запрос прошел')
            return {token: response.data, statusResponse: response.status};
        } catch (err) {
            const e = err as AxiosError<IToken, any>;
            console.log('запрос не прошел')
            return {token: new Token(), statusResponse: e.response!.status}
        }
    }

    async TryGetUser(token: IToken): Promise<IUser> {
        try {
            let response = await axios.get<IUser>("/user/", {headers: {Authorization: `token ${token.token}`}});
            console.log("Юзер получен")
            return response.data
        } catch (err) {
            const e = err as AxiosError<IUser, any>;
            throw new Error(`юзер не получен ${e.status}`);
        }
    }
}


export default new ApiClient();