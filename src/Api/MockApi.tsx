import React from "react";
import IUserApi from "./IUserApi";
import IToken from "../Model/Interface/IToken";
import AuthUser from "../Model/AuthUser";
import StatusResponse from "./StatusResponse";
import IUser from "../Model/Interface/IUser";
/*
class MockApi implements IApiAlfaFood{
    GetData<T>(token: IToken, url: string): Promise<{ newData: T[]; totalLoad: number }> {
        return Promise.resolve({newData: [], totalLoad: 0});
    }

    TryGetToken(user: AuthUser): Promise<{ token: IToken; statusResponse: StatusResponse }> {
        return Promise.resolve({statusResponse: undefined, token: undefined});
    }

    TryGetUser(token: IToken): Promise<IUser> {
        return Promise.resolve(undefined);
    }


}*/
