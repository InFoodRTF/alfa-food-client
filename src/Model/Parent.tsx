import IUser from "./Interface/IUser";
import Role from "./Enum/Role";
import role from "./Enum/Role";
import apiClient from "../Api/ApiClient";
import IToken from "./Interface/IToken";
class UserParent implements IUser{
    first_name: string = '';
    role: Role = role.NonAuth;
    last_name: string = '';
    username: string = '';
    balance: number = 0;



}

export default UserParent