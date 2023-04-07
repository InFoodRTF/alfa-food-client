import {makeAutoObservable, observable} from "mobx";
import Order from "../../../Model/Order/Order";
import AuthKey from "../../../Model/AuthKey";
import LoaderPagination from "../../../Lib/LoaderPagination";
import Requests from "../../../Api/Requests";

class OrdersStore {
    @observable
    Loader: LoaderPagination<Order> = new LoaderPagination<Order>(2, AuthKey.GetFromLocalStorage(), Requests.Orders);

    constructor() {
        makeAutoObservable(this);
    }
}

export default OrdersStore;