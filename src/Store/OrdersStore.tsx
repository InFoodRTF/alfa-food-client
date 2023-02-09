import {action, makeAutoObservable, observable} from "mobx";
import Order from "../Model/Order/Order";

class OrdersStore {
    @observable
    Orders: Order[] = []

    constructor() {
        makeAutoObservable(this);
    }

    @action
    GetOrder(): void {
        // мы берем id и потом фигавис запрос и достаем эти заказы, использую infiniteScroll
    }
}

export default OrdersStore;