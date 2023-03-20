import {action, computed, makeAutoObservable, observable} from "mobx";
import {IProduct} from "../../../componets/FoodCard/CardFood";

export default class Basket {
    @observable
    public cards: IProduct[] = []; // возможно отдельный интерфейсы с count отдельно
    @observable
    public sum: number = 0;
    constructor() {
        makeAutoObservable(this)
    }

    @computed get Sum() {
        return this.cards.reduce((a, v) => a = a + v.price, 0); // вроде можно упростить
    }

    @action
    Add(product: IProduct): void {
        this.cards.push(product);
        this.sum += product.price;
    }
}