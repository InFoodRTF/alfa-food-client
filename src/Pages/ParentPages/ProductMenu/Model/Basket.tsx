import {action, makeAutoObservable, observable} from "mobx";
import {IProduct} from "../../../../componets/FoodCard/CardFood";
import mealCategory from "../../../../Model/Enum/MealCategory";

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
    Add(product: IProduct): void {
        if (this.IsAddedYet(product.id)) {
            this.countItems[product.id]++;
            console.log(this.countItems.toString())
        } else {
            this.countItems[product.id] = 1;
            this.AddNew(product);
        }
        this.sum += product.price;
    }


    private IsAddedYet(id: number) {
        return this.countItems[id] !== undefined && this.countItems[id] !== 0;
    }

    private AddNew(product: IProduct) {
        if (product.meal_category === mealCategory.lunch)
            this.LunchProducts.push(product);

        else if (product.meal_category === mealCategory.dinner)
            this.DinnerProducts.push(product);

        else if (product.meal_category === mealCategory.breakfast)
            this.BreakfastProducts.push(product);
    }
}