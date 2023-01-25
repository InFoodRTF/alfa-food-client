import React from "react";
import axios from "axios";
import IToken from "../ViewModel/Interface/IToken";
import IAuthUser from "../ViewModel/Interface/IAuthUser";
import StatusResponse from "./Response/StatusResponse";

class ApiClient {

    async TryGetToken(user: IAuthUser): Promise<{token: IToken, statusResponse: StatusResponse}> {

        let response = await axios.post<IToken>("auth/login/", user)
        console.log(response.data)

        if (response.status === 400)
            console.log("ААААААА нету")

        return {token: response.data, statusResponse: response.status};
    }

}

export default new ApiClient();