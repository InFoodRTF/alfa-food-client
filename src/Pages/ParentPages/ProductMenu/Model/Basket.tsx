import {action, makeAutoObservable, observable} from "mobx";
import {IProduct} from "../../../../componets/FoodCard/CardFood";
import MealCategory from "../../../../Model/Enum/MealCategory";

export default class Basket {
    @observable
    public LunchProducts: IProduct[] = [];
    @observable
    public DinnerProducts: IProduct[] = [];
    @observable
    public BreakfastProducts: IProduct[] = []; // возможно отдельный интерфейсы с count отдельно
    @observable
    public countItems: { [id: number]: number; } = {};
    @observable
    public sum: number = 0;

    constructor() {
        makeAutoObservable(this)
    }

    @action
    Put(product: IProduct): void {
        if (!this.IsPutted(product.id)) {
            this.PutNew(product);
        }

        this.countItems[product.id]++;
        this.sum += product.price;
    }

    @action
    Extract(product: IProduct): void {
        if (this.countItems[product.id] === 1) {
            delete this.countItems[product.id];
            this.RemoveFromBasket(product);
        } else {
            this.countItems[product.id]--;
        }

        this.sum -= product.price;
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