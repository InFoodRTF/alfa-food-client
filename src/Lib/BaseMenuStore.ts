import {action, computed, makeObservable, observable} from "mobx";
import {Item, ItemOrder, ItemOrderType} from "../Pages/PagesParent/ProductMenu/ProductsMenu";
import CalendarSwitch from "../Pages/PagesParent/ProductMenu/Model/CalendarSwitch";
import Requests from "../Api/Requests";
import {IProduct} from "../componets/FoodCard/CardFood";
import storeAdapterApi from "../Api/StoreAdapterApi";

export abstract class BaseMenuStore extends storeAdapterApi {
    @observable
    SelectedMealCategory?: string;
    @observable
    menu: ItemOrderType = {}

    @computed
    get GetAvailableCategory(): string[] {
        if (this.menu === undefined)
            return [];
        let result: string[] = [];
        for (let category in this.menu) {
            result.push(category)
        }

        return result;
    }

    @action
    public ChangeMealCategory(mealCategory: string): void {
        this.SelectedMealCategory = mealCategory;
    }

    abstract LoadMenu(): Promise<void>;

    public ShowProduct(): IProduct[][] { // todo вроде название норм, и все таки мне не очень нравится И возможно можно сделать COMPUTED
        if (this.menu === undefined || this.SelectedMealCategory === undefined) return []

        const AvailableProduct = this.GetAvailableProduct(this.menu[this.SelectedMealCategory]);
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