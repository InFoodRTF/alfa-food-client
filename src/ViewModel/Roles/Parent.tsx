import IUser from "./IUser";
import Role from "../Enum/Role";
import role from "../Enum/Role";
import IToken from "../Interface/IToken";
import ApiClient from "../../Api/ApiClient";
class UserParent implements IUser{
    first_name: string = '';
    role: Role = role.NonAuth;
    last_name: string = '';
    username: string = '';
    balance: number = 0;

   async GetUser(Token: IToken): Promise<void> {
        if (Token.token === null){
            console.log("Токена нету")
            return;
        }

        let x = await ApiClient.TryGetUser<UserParent>(Token)
        this.username = x.username
        this.first_name = x.first_name
        this.role = x.role
        this.balance = x.balance
        this.username = x.username
        this.username = x.username
    }
}

export default UserParent