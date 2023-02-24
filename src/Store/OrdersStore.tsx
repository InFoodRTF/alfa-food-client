import {makeAutoObservable, observable} from "mobx";
import Order from "../Model/Order/Order";
import AuthKey from "../Model/AuthKey";
import LoaderPagination from "../Lib/LoaderPagination";
import ApiClient from "../Api/ApiClient";

class OrdersStore {
    @observable
    Loader: LoaderPagination<Order> = new LoaderPagination<Order>(2, AuthKey.GetFromLocalStorage(), "/orders/", new ApiClient()); // сомнительно выглядит ulr отдельно от apiclient: такое когда такие вещи назависмы таким образом

    constructor() {
        makeAutoObservable(this);
    }
}

export default OrdersStore;