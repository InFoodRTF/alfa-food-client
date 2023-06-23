import {action, computed, IObservableArray, makeObservable, observable} from "mobx";
import storeAdapterApi from "../Api/StoreAdapterApi";
import MealCategory from "../Model/Enum/MealCategory";



export type ItemsCategory = { [Category: string]: IObservableArray<Item>; } // todo название не самое понятное и круто было тебе не экспоритить в другие классы

export interface ItemOrderResponse {
    items: ItemsCategory
}

export interface Item {
    id: number;
    quantity: number;
    meal_category: string;
    product: IProduct
}

export interface IProduct {
    id: number
    name: string;
    price: number;
    description: string;
    grams: number;
    image: string;
    meal_category: MealCategory;
}

export abstract class BaseItemStore extends storeAdapterApi {
    // TOdo реализовать отобржаение в корзине
    @observable
    SelectedMealCategory?: string;
    // абстрация над product (доп данные: категория, количества этого продукта т.д
    @observable
    Items: ItemsCategory = {};

    protected constructor() {
        super();
        makeObservable(this)
    }

    @computed
    public get isEmpty(): boolean {
        return Object.keys(this.Items).length === 0; // по идей можно вынести в baseMenuStore
    }

    @computed
    public get showSelectedCategoryProduct(): Item[][] { // todo вроде название норм, и все таки мне не очень нравится И возможно можно сделать COMPUTED
        if (this.Items === undefined || this.SelectedMealCategory === undefined || this.Items[this.SelectedMealCategory] === undefined) return []

        const availableProduct = this.getAvailableProduct(this.Items[this.SelectedMealCategory]);
        return this.getInColumn<Item>(availableProduct, 3);
    }

    @computed
    get getAvailableCategory(): string[] {
        if (this.isEmpty) return [];

        let result: string[] = [];
        for (let category in this.Items) { // todo это что-то лютое!! почему это лютое ???)))
            result.push(category)
        }

        return result;
    }

    @action
    public clear() {
        this.Items = {};
    }

    @action
    public changeMealCategory(mealCategory: string): void {
        this.SelectedMealCategory = mealCategory;
    }

    abstract DownloadItems(): Promise<void> ;

    @action
    private getAvailableProduct(items: IObservableArray<Item>): Item[] {
        let result: Item[] = [];
        for (let item of items.toJSON()) {
            if (item.quantity === 0) continue;

            item.product.price = Number(item.product.price);
            result.push(item)
        }

        return result
    }


    @action
    private getInColumn<T>(products: T[], countRow: number): T[][] {
        const countColumn = Math.ceil(products.length / countRow)
        let result: T[][] = []

        for (let i = 0; i < countColumn; i++) {
            result.push(new Array<T>)
            for (let j = 0; j < countRow && i * countRow + j < products.length; j++) {
                result[i].push(products[i * countRow + j])
            }
        }

        return result
    }

}