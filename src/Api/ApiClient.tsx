import React from "react";
import axios, {} from "axios";
import IToken from "../Model/Interface/IToken";
import StatusResponse from "./Response/StatusResponse";
import IUser from "../Model/Interface/IUser";
import Token from "../Model/Token";
import AuthUser from "../Model/AuthUser";
class ApiClient {

    async TryGetToken(user: AuthUser): Promise<{ token: IToken, statusResponse: StatusResponse }> {
        try {
            let response = await axios.post<IToken>("auth/login/", user)
            console.log('dfas22')
            return {token: response.data, statusResponse: response.status};
        }
        catch (err){
            console.log('dfas1')
            // @ts-ignore - это кринж
            return {token: new Token(), statusResponse: err.response.status}
        }

    }

    async TryGetUser(token: IToken): Promise<IUser> {
        const st = token.token!.replace('\"', '')
        let response = await axios.get<IUser>("/user/", {headers: {Authorization: `token ${st.substring(0, st.length - 1)}` }});  // этот кринж нужно будет убрать
        let p = response.data
        // @ts-ignore - это кринж
        return response.data.user
        }
    }


export default new ApiClient();