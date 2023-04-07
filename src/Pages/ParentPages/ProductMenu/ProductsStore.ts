import {action, makeObservable, observable} from "mobx";
import CalendarSwitch from "../../../Model/CalendarSwitch";
import StoreAdapterApi from "../../../Api/StoreAdapterApi";
import Basket from "./Model/Basket";
import {IProduct} from "../../../componets/FoodCard/CardFood";

export default class ProductsStore extends StoreAdapterApi {
    @observable
    Calendar: CalendarSwitch = new CalendarSwitch();
    @observable
    FoodCards: IProduct[] = []
    @observable
    Basket: Basket = new Basket();

    constructor() {
        super()
        makeObservable(this)
    }

    @action
    async GetProduct(): Promise<void> {
        this.FoodCards = await this.GetData<IProduct[]>("/products");       // если что запрос не такой должен быть хотя потом еще узнаем
    }

    @action
    SelectProduct(product: IProduct): void {
        this.Basket.Add(product);
        console.log(product.name)
    }
}

