import {action, makeObservable, observable} from "mobx";
import CalendarSwitch from "./Model/CalendarSwitch";
import StoreAdapterApi from "../../../Api/StoreAdapterApi";
import Basket from "./Model/Basket";
import {IProduct} from "../../../componets/FoodCard/CardFood";

export default class ProductsStore extends StoreAdapterApi {
    @observable
    Calendar: CalendarSwitch = new CalendarSwitch();
    @observable
    FoodCards: IProduct[][] = []
    @observable
    Basket: Basket = new Basket();

    constructor() {
        super()
        makeObservable(this)
    }

    @action
    async GetProduct(): Promise<void> {
        let products = await this.GetData<IProduct[]>("/products");       // если что запрос не такой должен быть хотя потом еще узнаем
        this.FoodCards = this.GetInColumn(products, 3);
    }

    @action
    private GetInColumn(products: IProduct[], countInRow: number) {
        const countColumn = Math.ceil(products.length / countInRow)
        let array :IProduct[][] = []
        console.log(array)

        for (let i = 0; i < countColumn; i++) {
            array.push(new Array<IProduct>)
            for (let j = 0; j < countInRow && i * countInRow + j < products.length; j++) {
                array[i].push(products[i * countInRow + j])
            }
        }

        return array
    }

    @action
    SelectProduct(product: IProduct): void {
        this.Basket.Put(product);
        console.log(product.name)
    }
}

