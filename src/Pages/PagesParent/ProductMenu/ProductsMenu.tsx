import React from "react";

import {inject, observer} from "mobx-react";
import ProductsStore from "./ProductsStore";
import CardFood, {IProduct} from "../../../componets/FoodCard/CardFood";
import LeftMenu, {ClickChange} from "../../../componets/LeftMenuItem/LeftMenu";
import StudentsStore from "../../Store/StudentsStore";
import CartView from "./Component/BasketCard/CartView";
import {MealCategoryFilter} from "./Component/FilterFoodItem/MealCategoryFilter";
import CartStore from "./CartStore";
import {IStudent} from "../../Store/IStudent";
import {getFullName} from "../../../Lib/Transormators";

type props = {
    productsStore: ProductsStore;
    studentStore: StudentsStore;
    cartStore: CartStore;
}

export type ItemOrderType = { [Category: string]: Item[]; }

export interface ItemOrder {
    items: { [id: string]: Item[]; }
}

export interface Item {
    id: number;
    quantity: number;
    meal_category: string;
    product: IProduct
}

@inject("productsStore", 'studentStore', 'cartStore')
@observer
class ProductMenu extends React.Component {// todo придумать норм название класс, а то это кринж))
    GetFullNameClickEvent(students: IStudent[]): ClickChange[] { // я бы назвал это костылём
        let result: ClickChange[] = [];
        for (let student of students)
            result.push({
                text: getFullName(student),
                choseToChange: student.id.toString()
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
                    <LeftMenu calendar={productsStore.Calendar}
                              ButtonsText={this.GetFullNameClickEvent(studentStore.Students)}
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
                        <div style={{display: "flex", flexDirection: "row", gap: "20px", height: "44px"}}>
                            {
                                productsStore.GetAvailableCategory.map(mealCategory =>
                                    <MealCategoryFilter
                                        value={mealCategory}
                                        changeMealCategory={() => productsStore.ChangeMealCategory(mealCategory)}/>
                                )
                            }
                        </div>
                        <div style={{display: "flex", flexDirection: "column", gap: "20px"}}>
                            {
                                productsStore.ShowProduct().map(foodColumn =>
                                    <div style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        gap: "20px"
                                    }}> {foodColumn.map(food =>
                                        <CardFood
                                            key={food.id}
                                            item={food}
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