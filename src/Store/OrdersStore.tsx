import {action, makeAutoObservable, observable} from "mobx";
import Order from "../Model/Order/Order";
import ApiClient from "../Api/ApiClient";
import AuthKey from "../Model/AuthKey";
import LoaderPagination from "../Model/LoaderPagination";
import ILoaderPagination from "../Model/Interface/ILoaderPagination";

class OrdersStore {
    @observable
    Orders: Order[] = []
    @observable
    Loader: ILoaderPagination = new LoaderPagination(2);

    constructor() {
        makeAutoObservable(this);
    }

    // TODO может соmputed для определение offSet'a ?
    @action
    async GetOrders(): Promise<void> {
        console.log("пошли заказы")
        AuthKey.ExtractFromLocalStorage()
        let {orders, totalLoad} = await ApiClient.GetOrders(AuthKey, this.Loader.GetLimit, this.Loader.GetOffSet)
        this.Orders = [...this.Orders, ...orders];
        this.Loader.LoaderUpdate(this.Orders.length, totalLoad)
    }
}

export default OrdersStore;