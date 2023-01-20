import apiClient from "../Api/ApiClient";
import User from "./User";

export default class Token {
    value: string = "";


    async CheckInServer(user: User) {
        this.value = await apiClient.GetToken(user);
        console.log(this.value)
    }
}