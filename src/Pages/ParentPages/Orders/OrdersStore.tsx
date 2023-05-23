import {makeAutoObservable, observable} from "mobx";
import AuthKey from "../../../Model/AuthKey";
import LoaderPagination from "../../../Lib/LoaderPagination";
import Requests from "../../../Api/Requests";
import {Order} from "./component/OrderCard/OrderCard";

class OrdersStore {
    @observable
    Loader: LoaderPagination<Order> = new LoaderPagination<Order>(2, AuthKey.GetFromLocalStorage(), Requests.Orders); // вот бы сделать, чтоб эта штука работала с колонками, как в меню product, то есть чтоб она только выводила данные в этот стор а мы уже с ними работали как хотели + адаптивность

    constructor() {
        makeAutoObservable(this);
    }
}

export default OrdersStore;