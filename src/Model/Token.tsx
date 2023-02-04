import TokenServer from "./ServerWork/TokenServer";

export default class Token extends TokenServer {
    token: string | null = null;

    GetTokenByLocalStorage(): void {
        const token = localStorage.getItem('token');

        if (token === null)
            console.log("ой ай в стораже нету токена")

        this.token = token;
    }
}

