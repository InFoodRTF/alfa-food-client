import React from "react";
import axios, {AxiosResponse} from "axios";
import IToken from "../ViewModel/Interface/IToken";
import IAuthUser from "../ViewModel/Interface/IAuthUser";
import StatusResponse from "./Response/StatusResponse";
import IUser from "../ViewModel/Interface/IUser";
import Token from "../ViewModel/Token";
import statusResponse from "./Response/StatusResponse";

class ApiClient {

    async TryGetToken(user: IAuthUser): Promise<{ token: IToken, statusResponse: StatusResponse }> {
        let status: number = statusResponse.Wait;
        try {
            let response = await axios.post<IToken>("auth/login/", user)
            status = response.status;
            console.log('dfas22')
            return {token: response.data, statusResponse: response.status};
        }
        catch (err){
            console.log('dfas1')
            // @ts-ignore
            return {token: new Token(), statusResponse: err.response.status}
        }

        console.log('dfas1')



    }

    async TryGetUser(token: IToken): Promise<IUser> {
        let response = await axios.get<IUser>("/user/", {headers: {Authorization: `Token ${token.token}` }});

            return response.data
        }
    }


export default new ApiClient();