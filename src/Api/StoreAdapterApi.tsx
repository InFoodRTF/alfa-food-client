import React from "react";
import AuthKey from "../Model/AuthKey";
import IToken from "../Model/Interface/IToken";
import ApiClient from "./ApiClient";
import StatusResponse from "./StatusResponse";

abstract class StoreAdapterApi {
    private Token: IToken = AuthKey.GetFromLocalStorage();
    private _api: ApiClient = new ApiClient();


    protected async GetData<T>(url: string): Promise<T> {
        return await this._api.GetEntityByToken<T>(this.Token, url); // вроде как выглядит неплохо, если так сделать то куча логике не нужно будет повторять в каждом store
    }

    protected async PostWithResult<TGet, TPost>(url: string, data: TPost): Promise<{ token: TGet, statusResponse: StatusResponse }> {
        return await this._api.PostDataWithResult<TGet, TPost>(url, data);
    }
}

export default StoreAdapterApi