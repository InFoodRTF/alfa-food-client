import {action, makeObservable, observable} from "mobx";
import CalendarSwitch from "./Model/CalendarSwitch";
import StoreAdapterApi from "../../../Api/StoreAdapterApi";
import CartStore from "./CartStore";
import {IProduct} from "../../../componets/FoodCard/CardFood";
import {Item, ItemOrder} from "./ProductsMenu";
import MealCategory from "../../../Model/Enum/MealCategory";
export default class ProductsStore extends StoreAdapterApi {
    @observable
    Calendar: CalendarSwitch = new CalendarSwitch();
    @observable
    ProductCardLunch: IProduct[][] = [];
    @observable
    ProductCardBreakfast: IProduct[][] = [];
    @observable
    ProductCardLuncDinner: IProduct[][] = [];
    @observable
    SelectedMealCategory: MealCategory = MealCategory.breakfast;
    private _getMenuUrl = (date: string) => `/menu/?date=2023-04-30` // дату если что смени брать из


    constructor() {
        super()
        makeObservable(this)
    }

    public ChangeMealCategory(mealCategory: MealCategory): void {
        this.SelectedMealCategory = mealCategory;
    }
    @action
    public async LoadMenu(): Promise<void> {
        const curDate = this.Calendar.Date.toLocaleString().split(',')[0];
        const menu: ItemOrder = await this.GetData<ItemOrder>(this._getMenuUrl(curDate));
        console.log("здесь items")

        this.ProductCardBreakfast = this.GetItems(menu.items["Завтрак"]);
        this.ProductCardLunch = this.GetItems(menu.items["Обед"]);
    }

    // TODO название ля поменяй эти item ахуеть как много говорят, прям классная абстракция, сразу одно в голове, а не 1000 разные вещей НЕ ЗАБУДЬ А ТО БУДЕТ КРРИНЖ
    private GetItems(items: Item[]): IProduct[][] {
        const AvailableProduct = this.GetAvailableProduct(items);
        return this.GetInColumn(AvailableProduct, 3);
    }

    @action
    private GetAvailableProduct(items: Item[]): IProduct[] {
        let result: IProduct[] = [];
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

