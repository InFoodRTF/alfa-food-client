import React from "react";
import AuthKey from "../Model/AuthKey";
import IUserApi from "../Api/IUserApi";
import IToken from "../Model/Interface/IToken";
import {makeAutoObservable} from "mobx";

abstract class BaseStoreToken {
    private Token: IToken = AuthKey.GetFromLocalStorage();

    constructor(private _api: IUserApi) {
        makeAutoObservable(this)
    }

    protected async GetFromServer<T>(url: string): Promise<T> {
        return await this._api.GetEntity<T>(this.Token, url); // вроде как выглядит неплохо, если так сделать то куча логике не нужно будет повторять в каждом store
    }
}

export default BaseStoreToken