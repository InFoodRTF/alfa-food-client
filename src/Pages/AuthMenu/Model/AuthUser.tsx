export default class AuthUser{
    username: string = ''
    password: string = ''

    ChangeUserName(name: string) {
        this.username = name;
    }

    ChangePassword(password: string) {
        this.password = password;
    }
}