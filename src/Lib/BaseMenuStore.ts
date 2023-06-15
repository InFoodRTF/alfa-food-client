import {action, computed, observable, toJS} from "mobx";
import {Item, ItemOrderType} from "../Pages/PagesParent/ProductMenu/ProductsMenu";
import storeAdapterApi from "../Api/StoreAdapterApi";


/**
 *  Это базовый класс для управления меню в приложении
 * Отыгрывает ключевую роль в организации функционала меню в рамках приложения.
 * Предоставляет возможность выбирать категории меню, загружать список доступных продуктов и выводить выбранную категорию продуктов в виде матрицы.
 * матрица, потому, что в html нужно
 */
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

    abstract DownloadMenu(): Promise<void> ;

    // гланый метод вывода всех товаров
    public ShowProduct(): Item[][] { // todo вроде название норм, и все таки мне не очень нравится И возможно можно сделать COMPUTED
        if (this.menu === undefined || this.SelectedMealCategory === undefined) return []

        const AvailableProduct = this.GetAvailableProduct(this.menu[this.SelectedMealCategory]);
        return this.GetInColumn<Item>(AvailableProduct, 3);
    }


    @action
    private GetAvailableProduct(items: Item[]): Item[] {
        let result: Item[] = [];
        if (items == null) return result;
        for (let item of items) {
            if (item.quantity === 0) continue;

            item.product.price = Number(item.product.price);
            // TODO Лютый костыль
            console.log(toJS(item), "ds;lkfajsd;lfska")
            if (item.idProduct === undefined)
                item.idProduct = item.product.id;
            item.product.id = item.id;
            console.log(toJS(item), "agter")
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