import TokenServer from "./ServerWork/TokenServer";
import IToken from "./Interface/IToken";

class AuthKey extends TokenServer {
    token: string | null = null;

    ExtractFromLocalStorage(): void {
        const token = localStorage.getItem('token');

        if (token === null)
            console.log("ой ай в стораже нету токена")

        this.token = token;
    }

    LoadToLocalStorage(token: IToken): void {
        localStorage.setItem("token", token.token!)
        console.log("вышли из запроса токена")

        this.token = token.token;
    }
}

export default new AuthKey();

