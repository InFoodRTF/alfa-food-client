import {action, makeObservable, override} from "mobx";
import UserServer from "./ServerWork/UserServer";


export default class AuthUser extends UserServer {
    username: string = ''
    password: string = ''

    constructor() {
        super()
        makeObservable(this, {
            username: override,
            password: override,
            ChangeName: action,
            ChangePassword: action
        })
    }

    ChangeName(name: string) {
        this.username = name;
    }

    ChangePassword(password: string) {
        this.password = password;
    }
}