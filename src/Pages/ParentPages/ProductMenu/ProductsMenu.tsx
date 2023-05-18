import React from "react";

import {inject, observer} from "mobx-react";
import ProductsStore from "./ProductsStore";
import CardFood, {IProduct} from "../../../componets/FoodCard/CardFood";
import LeftMenu, {ButtonClick} from "../../../componets/LeftMenuItem/LeftMenu";
import StudentsStore from "../ParentProfile/Store/StudentsStore";
import CartView from "./Component/BasketCard/CartView";
import {FilterFoodItem} from "./Component/FilterFoodItem/FilterFoodItem";
import MealCategory from "../../../Model/Enum/MealCategory";
import CartStore from "./CartStore";
import ModalConfirmChange from "../../../componets/ModalView/ModalConfirmChange";
import {IStudent} from "../ParentProfile/Store/IStudent";

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

    GetFullName(students: IStudent[]): ButtonClick[] {
        let result: ButtonClick[] = [];
        for (let student of students)
            result.push({
                text: `${student.first_name} ${student.middle_name} ${student.last_name}`,
                choseToChange: student.id
            }) // ваще можно было бы ватащить и в класс, ибо так то много где нужно это

        return result;
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
                    <LeftMenu calendar={productsStore.Calendar} ButtonsTextChange={this.GetFullName(studentStore.Students)}
                              onChangeButtons={async (e) => {
                                  cartStore.ChangeStudentId(e);
                                  await cartStore.changeCart();
                              }}
                              onChangeCalendar={async () => {
                                  await productsStore.LoadMenu();
                                  await cartStore.changeCart()
                              }}
                              canDataChange={cartStore.isEmpty}/>
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
                                        addToCart={(e: IProduct) => cartStore.Put(e, true)}/>)}
                                </div>)}
                        </div>
                    </div>
                    <CartView cart={cartStore}/>
                </div>
            </div>
        );
    }
}

export default ProductMenu