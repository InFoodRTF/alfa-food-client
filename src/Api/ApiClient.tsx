import React from "react";
import axios from "axios";
import User from "../ViewModel/User";

class ApiClient {

    async GetToken(user: User) {
        let x = await axios.post("auth/login/", {username: user.username, password: user.password})

        console.log(x.data)
        return x.data;
    }

}

export default new ApiClient();