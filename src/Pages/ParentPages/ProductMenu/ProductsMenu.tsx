import React from "react";

import {inject, observer} from "mobx-react";
import ProductsStore from "./ProductsStore";
import CardFood, {IProduct} from "../../../componets/FoodCard/CardFood";
import LeftMenu from "../../../componets/LeftMenuItem/LeftMenu";
import StudentsStore from "../ParentProfile/Store/StudentsStore";
import CardBasket from "../../../componets/BasketCard/CardBasket";
import {FilterFoodItem} from "../../../componets/FilterFoodItem/FilterFoodItem";
import MealCategory from "../../../Model/Enum/MealCategory";
import CartStore from "./CartStore";

type props = {
    productsStore: ProductsStore;
    studentStore: StudentsStore;
    cartStore: CartStore;
}

export interface ItemOrder {
    items: { [id: string]: Item[]; }
}

export interface Item {
    id: number;
    quantity: number;
    meal_category: MealCategory;
    product: IProduct
}

@inject("productsStore", 'studentStore', 'cartStore')
@observer
class ProductMenu extends React.Component {
    private GetFilteredProduct(mealCategory: MealCategory): IProduct[][] {
        switch (mealCategory) {
            case MealCategory.breakfast:
                return this.injected.productsStore.ProductCardBreakfast;
            case MealCategory.lunch:
                return this.injected.productsStore.ProductCardLunch;
            default :
                return []
        }

    }

    get injected(): props {
        return this.props as props;
    }

    async componentDidMount() {
        await this.injected.studentStore.LoadStudent();
        await this.injected.productsStore.LoadMenu();
        // ченки lifecycly hooks и сделай все красиво бро
    }

    render() {
        const {productsStore, studentStore, cartStore} = this.injected;

        return (
            <div>
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "20px",
                    width: "1119px",
                    marginTop: "70px",
                    marginLeft: "auto",
                    marginRight: "auto"
                }}>
                    <LeftMenu calendar={productsStore.Calendar} student={studentStore.Students}
                              changeId={(e) => cartStore.ChangeStudentId(e)} loadMenu={() => productsStore.LoadMenu()} />
                    <div style={{display: "flex", flexDirection: "column", gap: "20px"}}>
                        <FilterFoodItem ChangeMealCategory={(e) => productsStore.ChangeMealCategory(e)}/>
                        <div style={{display: "flex", flexDirection: "column", gap: "20px"}}>
                            {this.GetFilteredProduct(productsStore.SelectedMealCategory).map(foodColumn =>
                                <div style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    gap: "20px"
                                }}> {foodColumn.map(food =>
                                    <CardFood
                                        key={food.id}
                                        product={food}
                                        addToBasket={(e: IProduct) => cartStore.Put(e)}/>)}
                                </div>)}
                        </div>
                    </div>
                    <CardBasket cart={cartStore}/>
                </div>
            </div>
        );
    }
}

export default ProductMenu