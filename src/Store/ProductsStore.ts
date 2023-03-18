import {action, makeObservable, observable} from "mobx";
import CalendarSwitch from "../Model/CalendarSwitch";
import IProductMainInfo from "../Model/Interface/IFoodMainInfo";
import StoreTokenBase from "./StoreTokenBase";
import Basket from "../Model/Basket";

export default class ProductsStore extends StoreTokenBase {
    @observable
    Calendar: CalendarSwitch = new CalendarSwitch();
    @observable
    FoodCards: IProductMainInfo[] = []
    @observable
    Basket: Basket = new Basket();

    constructor() {
        super()
        makeObservable(this)
    }

    @action
    async GetProduct(): Promise<void> {
        this.FoodCards = await this.GetData<IProductMainInfo[]>("/products?meal_category=1");
    }

    @action
    SelectProduct(product: IProductMainInfo): void {
        this.Basket.add(product);
    }
}

