import {action, computed, IObservableArray, makeObservable, observable, toJS} from "mobx";
import {Item, ItemOrderType} from "../Pages/PagesParent/ProductMenu/ProductsMenu";
import storeAdapterApi from "../Api/StoreAdapterApi";


/**
 *  Это базовый класс для управления меню в приложении
 * Отыгрывает ключевую роль в организации функционала меню в рамках приложения.
 * Предоставляет возможность выбирать категории меню, загружать список доступных продуктов и выводить выбранную категорию продуктов в виде матрицы.
 * матрица, потому, что в html нужно
 */

// потенциально это будет класс стор, который работает именно с item's, то есть с чистыми данными с Сервера (item - в postman норм показана что это)
export abstract class BaseMenuStore extends storeAdapterApi {
    @observable
    SelectedMealCategory?: string = "Завтрак"; // TOdo не забудь сменить
    @observable
    menu: ItemOrderType = {};

    protected constructor() {
        super();
        makeObservable(this)
    }

    @computed
    get GetAvailableCategory(): string[] {
        if (this.menu === undefined) return [];

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

    abstract DownloadMenu(): Promise<void> ;

    @computed
    public get ShowSelectedCategoryProduct(): Item[][] { // todo вроде название норм, и все таки мне не очень нравится И возможно можно сделать COMPUTED
        if (this.menu === undefined || this.SelectedMealCategory === undefined || this.menu[this.SelectedMealCategory] === undefined) return []

        console.log(toJS(this.menu),"Work here2")
        const availableProduct = this.GetAvailableProduct(this.menu[this.SelectedMealCategory]);
        console.log(availableProduct, "work here 3")
        return this.GetInColumn<Item>(availableProduct, 3);
    }


    @action
    private GetAvailableProduct(items: IObservableArray<Item>): Item[] {
        let result: Item[] = [];
        console.log(items, "Я здеееесь")
        if (items.toString() === "Страница не найдена") return result;
        for (let item of items.toJSON()) {
            if (item.quantity === 0) continue;

            item.product.price = Number(item.product.price);
            result.push(item)
        }

        return result
    }


    @action
    private GetInColumn<T>(products: T[], countInRow: number): T[][] {
        const countColumn = Math.ceil(products.length / countInRow)
        let array: T[][] = []

        for (let i = 0; i < countColumn; i++) {
            array.push(new Array<T>)
            for (let j = 0; j < countInRow && i * countInRow + j < products.length; j++) {
                array[i].push(products[i * countInRow + j])
            }
        }

        return array
    }

}