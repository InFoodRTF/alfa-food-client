import IProduct from "./Interface/IFoodMainInfo";
import {action, computed, makeAutoObservable, observable} from "mobx";

export default class Basket {
    @observable
    private cards: IProduct[] = [];

    constructor() {
        makeAutoObservable(this)
    }

    @computed get Sum() {
        return this.cards.reduce((a, v) => a = a + v.price, 0); // вроде можно упростить
    }

    @action
    add(product: IProduct): void {
        this.cards.push(product);
    }
}