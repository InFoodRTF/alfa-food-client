import {action, makeAutoObservable, observable} from "mobx";
import Order from "../Model/Order/Order";
import ApiClient from "../Api/ApiClient";
import AuthKey from "../Model/AuthKey";

class OrdersStore {
    @observable
    Orders: Order[] = []
    @observable
    CanLoad: boolean = true;
    @observable
    OrdersTotal: number = 0;
    @observable
    offSet: number = 0; // есть идея сделать класс токен статиком, чтоб не создавть его буквально везде, а так пару строчек и все, и можно было бы вообще убрать токен как класс, но я не уверне, что с ним не будут еще какие-то махинаций сделаны
    constructor() {
        makeAutoObservable(this);
    }

    // TODO может соmputed для скролла ?
    @action
    async GetOrder(): Promise<void> {
        console.log("пошли заказы")
        if (this.OrdersTotal !== 0 && this.Orders.length === this.OrdersTotal) {
            this.CanLoad = false;
            return;
        }

        AuthKey.ExtractFromLocalStorage()
        let {orders, totalCount} = await ApiClient.GetOrders(AuthKey, this.offSet)
        this.offSet += 2;
        this.OrdersTotal = totalCount;
        this.Orders = [...this.Orders, ...orders];
    }
}

export default OrdersStore;