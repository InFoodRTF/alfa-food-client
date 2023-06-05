import IToken from "./Interface/IToken";

class AuthKey implements IToken{
    token: string | null = null;

    GetFromLocalStorage(): IToken {
        this.token = localStorage.getItem('token');

        if (this.token === null)
            console.log("Токена нету")

        return this;
    }
    Remove() : void {
        localStorage.removeItem('token')
    }
    LoadToLocalStorage(token: IToken): void {
        localStorage.setItem("token", token.token!)
        console.log("вышли из запроса токена")

        this.token = token.token;
    }
}

export default new AuthKey();

