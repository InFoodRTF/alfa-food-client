import {action, makeAutoObservable, observable} from "mobx";
import Order from "../Model/Order/Order";
import ApiClient from "../Api/ApiClient";
import AuthKey from "../Model/AuthKey";
import LoaderPagination from "../Model/LoaderPagination";
import ILoaderPagination from "../Model/Interface/ILoaderPagination";
import ListPagination from "../Model/ListPagination";

class OrdersStore {
    @observable
    Loader: LoaderPagination<Order> = new LoaderPagination<Order>(2, AuthKey.ExtractFromLocalStorage(), "/Orders/");

    constructor() {
        makeAutoObservable(this);
    }
}

export default OrdersStore;