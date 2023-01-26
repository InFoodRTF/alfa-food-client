import React from "react";
import Profile from "../../Entity/Profile";
import Role from "../Enum/Role";
interface IUser{
    username: string;
    first_name: string;
    last_name: string;
    profile: Profile
    role: Role
}

export default IUser;