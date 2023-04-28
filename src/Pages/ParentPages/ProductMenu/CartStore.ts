import {action, makeObservable, observable} from "mobx";
import {IProduct} from "../../../componets/FoodCard/CardFood";
import MealCategory from "../../../Model/Enum/MealCategory";
import storeAdapterApi from "../../../Api/StoreAdapterApi";

export default class CartStore extends storeAdapterApi{
    @observable
    public LunchProducts: IProduct[] = [];
    @observable
    public DinnerProducts: IProduct[] = [];
    @observable
    public BreakfastProducts: IProduct[] = [];
    @observable
    public countItems: { [id: number]: number; } = {};
    @observable
    public sum: number = 0;
    @observable
    public StudentId: number = 0;
    private _addProductUlr = () => `/cart/add/`
    private _removeProductUlr = () => `/cart/remove/`
    constructor() {
        super();
        makeObservable(this);
    }

    @action
    public async Put(product: IProduct): Promise<void> {
        // TODO здесь можно получить данные и их использвать
        await this.PostByToken(this._addProductUlr(), {menuitem_id: product.id});
        if (!this.IsPutted(product.id)) {
            this.PutNew(product);
        }

        this.countItems[product.id]++;
        this.sum += product.price;
    }

    @action
    async Extract(product: IProduct): Promise<void> {
        await this.PostByToken(this._removeProductUlr(), {menuitem_id: product.id});
        if (this.countItems[product.id] === 1) {
            delete this.countItems[product.id];
            this.RemoveFromBasket(product);
        } else {
            this.countItems[product.id]--;
        }

        this.sum -= product.price;
    }

    @action
    ChangeStudentId(studentId: number) {
        this.StudentId = studentId;
        console.log("id сменили: " + studentId)
    }

    private RemoveFromBasket(product: IProduct): void {
        switch (product.meal_category) {
            case MealCategory.breakfast:
                this.Remove(this.BreakfastProducts, product);
                break;
            case MealCategory.dinner:
                this.Remove(this.DinnerProducts, product);
                break;
            case MealCategory.lunch:
                this.Remove(this.LunchProducts, product)
        }
    }

    private Remove(Products: IProduct[], product: IProduct) {
        const index = Products.indexOf(product);
        delete Products[index];
    }

    private IsPutted(id: number) {
        return this.countItems[id] !== undefined && this.countItems[id] !== 0;
    }

    //TODO ооо великий рефакторинг, приди и сделай по нормальному плз
    private PutNew(product: IProduct) {
        this.countItems[product.id] = 0;

        if (product.meal_category === MealCategory.lunch)
            this.LunchProducts.push(product);

        else if (product.meal_category === MealCategory.dinner)
            this.DinnerProducts.push(product);

        else if (product.meal_category === MealCategory.breakfast)
            this.BreakfastProducts.push(product);
    }
}