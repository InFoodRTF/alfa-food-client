import UserServer from "./ServerWork/UserServer";


export default class AuthUser extends UserServer {
    username: string = ''
    password: string = ''

    ChangeUserName(name: string) {
        this.username = name;
    }

    ChangePassword(password: string) {
        this.password = password;
    }
}