import {action, makeAutoObservable, observable} from "mobx";
import Order from "../Model/Order/Order";
import ApiClient from "../Api/ApiClient";
import Token from "../Model/Token";

class OrdersStore {
    @observable
    Orders: Order[] = []
    @observable
    TotalCount: number = 0;
    @observable
    offSet: number = 0;
    @observable
    Token: Token = new Token(); // есть идея сделать класс токен статиком, чтоб не создавть его буквально везде, а так пару строчек и все, и можно было бы вообще убрать токен как класс, но я не уверне, что с ним не будут еще какие-то махинаций сделаны
    constructor() {
        makeAutoObservable(this);
    }

    @action
    async GetOrder(): Promise<void> {
        console.log("пошли заказы")
        if (this.TotalCount !== 0 && this.Orders.length >= this.TotalCount) return;

        this.Token.ExtractFromLocalStorage()
        console.log("кол во з:" + this.Orders.length)
        let {orders, totalCount} = await ApiClient.GetOrders(this.Token, this.offSet)
        this.offSet += 2;
        console.log(totalCount)
        this.TotalCount = totalCount;
        console.log("кол во з:" + this.Orders.length)
        this.Orders = [...this.Orders, ...orders];
        console.log("кол во з:" + this.Orders.length)
    }
}

export default OrdersStore;