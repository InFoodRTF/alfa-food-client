import {action, computed, IObservableArray, makeObservable, observable, toJS} from "mobx";
import {Item, ItemOrderType} from "../Pages/PagesParent/ProductMenu/ProductsMenu";
import storeAdapterApi from "../Api/StoreAdapterApi";


/**
 *  Это базовый класс для управления Продуктами в приложении
 * Отыгрывает ключевую роль в организации функционала меню в рамках приложения.
 * Предоставляет возможность выбирать категории меню, загружать список доступных продуктов и выводить выбранную категорию продуктов в виде матрицы.
 * матрица, потому, что в html нужно
 */

// потенциально это будет класс стор, который работает именно с item's, то есть с чистыми данными с Сервера (item - абстрация над product (доп данные типа катеогрий, количества этого продукта т.д))
export abstract class BaseItemStore extends storeAdapterApi {
    @observable
    SelectedMealCategory?: string; // TOdo не забудь сменить
    @observable
    Items: ItemOrderType = {};

    protected constructor() {
        super();
        makeObservable(this)
    }

    @computed
    public get isEmpty(): boolean {
        return Object.keys(this.Items).length === 0; // по идей можно вынести в baseMenuStore
    }

    @action
    public ItemsClear() {
        this.Items = {};
    }



    @computed
    get GetAvailableCategory(): string[] {
        if (this.Items === undefined) return [];

        console.log(toJS(this.Items),"2222222")
        let result: string[] = [];
        for (let category in this.Items) { // todo это что-то лютое!!
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
        if (this.Items === undefined || this.SelectedMealCategory === undefined || this.Items[this.SelectedMealCategory] === undefined) return []

        console.log(toJS(this.Items),"Work here2")
        const availableProduct = this.GetAvailableProduct(this.Items[this.SelectedMealCategory]);
        console.log(availableProduct, "work here 3")
        return this.GetInColumn<Item>(availableProduct, 3);
    }


    @action
    private GetAvailableProduct(items: IObservableArray<Item>): Item[] {
        let result: Item[] = [];
        console.log(items, "Я здеееесь")
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