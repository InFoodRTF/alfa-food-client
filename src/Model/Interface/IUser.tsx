import React from "react";
import Role from "../Enum/Role";
interface IUser{
    username: string;
    first_name: string;
    last_name: string;
    middle_name: string;
    readonly role: Role;
}

export default IUser;