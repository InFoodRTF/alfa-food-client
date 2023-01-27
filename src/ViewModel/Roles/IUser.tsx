import React from "react";
import Profile from "../../Entity/Profile";
import Role from "../Enum/Role";
import IToken from "./IToken";
interface IUser{
    username: string;
    first_name: string;
    last_name: string;
    profile: Profile
    role: Role
    GetUser(Token: IToken): void
}

export default IUser;