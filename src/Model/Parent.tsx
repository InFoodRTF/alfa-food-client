import IUser from "./Interface/IUser";
import Role from "./Enum/Role";
import role from "./Enum/Role";
import {makeAutoObservable} from "mobx";

class Parent implements IUser {
    first_name: string = '';
    role: Role = role.NonAuth;
    last_name: string = '';
    username: string = '';
    middle_name: string = '';
    balance: number = 0;

    constructor() {
        makeAutoObservable(this)
    }



}

export default Parent