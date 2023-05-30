import React from "react";
import AuthKey from "../Model/AuthKey";
import IToken from "../Model/Interface/IToken";
import ApiClient, {ResponseData} from "./ApiClient";

abstract class StoreAdapterApi {
    private Token: IToken = AuthKey.GetFromLocalStorage();
    private _api: ApiClient = new ApiClient();


    protected async getDataByToken<T>(url: string): Promise<T> {
        return await this._api.GetEntityByToken<T>(this.Token, url); // вроде как выглядит неплохо, если так сделать то куча логике не нужно будет повторять в каждом store
    }

    protected async postWithResult<TGet, TPost>(url: string, data: TPost): Promise<ResponseData<TGet>> {
        return await this._api.PostDataWithResult<TGet, TPost>(url, data);
    }

    protected async postByToken<TGet, TPost>(url: string, data: TPost): Promise<ResponseData<TGet>> {
        return await this._api.PostDataWithResultByToken(url, this.Token, data);
    }

    protected async patchByToken<TGet, TPost>(url: string, data: TPost): Promise<ResponseData<TGet>> {
        return await this._api.PatchDataWithResult(url, this.Token, data);
    }
}

export default StoreAdapterApi