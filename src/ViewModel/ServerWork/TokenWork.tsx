import User from "./User";
import apiClient from "../Api/ApiClient";
import IToken from "./Interface/IToken";

export default abstract class TokenWorkServer implements IToken{
    public value: string = '';

    async GetToken(user: User) {
        this.value = await apiClient.GetToken(user);
        console.log(this.value)
    }
}