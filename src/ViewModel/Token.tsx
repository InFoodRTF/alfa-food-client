import TokenServer from "./ServerWork/TokenServer";

export default class Token extends TokenServer {
    token: string = "";

    GetTokenByLocalStorage(): void{
        const tokenStore = localStorage.getItem('token');

        if (tokenStore === null)
            console.log("ой ай в стораже нету токена")
    }
}

