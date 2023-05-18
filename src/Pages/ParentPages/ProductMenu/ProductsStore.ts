import {action, computed, makeObservable, observable} from "mobx";
import CalendarSwitch from "./Model/CalendarSwitch";
import StoreAdapterApi from "../../../Api/StoreAdapterApi";
import {IProduct} from "../../../componets/FoodCard/CardFood";
import {Item, ItemOrder} from "./ProductsMenu";
import MealCategory from "../../../Model/Enum/MealCategory";
import Requests from "../../../Api/Requests";

export default class ProductsStore extends StoreAdapterApi {
    @observable
    Calendar: CalendarSwitch;
    @observable
    ProductCardLunch: IProduct[][] = [];
    @observable
    ProductCardBreakfast: IProduct[][] = [];
    @observable
    ProductCardDinner: IProduct[][] = [];
    @observable
    SelectedMealCategory: MealCategory = MealCategory.nothing;

    constructor(calendarSwitch: CalendarSwitch) {
        super()
        makeObservable(this)
        this.Calendar = calendarSwitch;
    }

    @action
    public ChangeMealCategory(mealCategory: MealCategory): void {
        this.SelectedMealCategory = mealCategory;
    }

    @action
    public async LoadMenu(): Promise<void> {
        const menu: ItemOrder = await this.GetDataByToken<ItemOrder>(Requests.GetMenu(this.Calendar.CurDate));
        this.ClearProducts();

        // todo эту штуку можно сделать явно проще чем есть сейчас
        for (let key in menu.items) {
            console.log(key, "это ключ данных")
            switch (key) {
                case "Завтрак":
                    this.ProductCardBreakfast = this.GetProduct(menu.items[key]);
                    break;
                case "Обед":
                    this.ProductCardLunch = this.GetProduct(menu.items[key]);
                    break;
                case "Полдник":
                    this.ProductCardDinner = this.GetProduct(menu.items[key]);
                    break;
            }
        }

    }

    @action
    private ClearProducts(): void {
        this.ProductCardBreakfast = [];
        this.ProductCardLunch = [];
        this.ProductCardDinner = [];
    }

    // название так себе - он еще по колоннам распределяет
    private GetProduct(items: Item[]): IProduct[][] {
        const AvailableProduct = this.GetAvailableProduct(items);
        return this.GetInColumn(AvailableProduct, 3);
    }


    // пока реализцация такая, более красивая когда-нибудь потом
    @action
    private GetAvailableProduct(items: Item[]): IProduct[] {
        let result: IProduct[] = [];
        if (items == null) return result;

        for (let item of items) {
            if (item.quantity === 0) continue;

            item.product.price = Number(item.product.price);
            item.product.id = item.id;
            result.push(item.product)
        }

        return result
    }


    // TODO можно сделать универсальным и не болеть и радоваться жизни
    @action
    private GetInColumn(products: IProduct[], countInRow: number) {
        const countColumn = Math.ceil(products.length / countInRow)
        let array: IProduct[][] = []

        for (let i = 0; i < countColumn; i++) {
            array.push(new Array<IProduct>)
            for (let j = 0; j < countInRow && i * countInRow + j < products.length; j++) {
                array[i].push(products[i * countInRow + j])
            }
        }

        return array
    }
}

