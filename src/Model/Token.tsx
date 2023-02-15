import TokenServer from "./ServerWork/TokenServer";

export default class Token extends TokenServer {
    token: string | null = null;

    ExtractFromLocalStorage(): void {
        const token = localStorage.getItem('token');

        if (token === null)
            console.log("ой ай в стораже нету токена")

        this.token = token;
    }
}

