import React from "react";

import {inject, observer} from "mobx-react";
import ProductsStore from "./ProductsStore";
import CardFood, {IProduct} from "../../../componets/FoodCard/CardFood";
import LeftMenu from "../../../componets/LeftMenuItem/LeftMenu";
import StudentsStore from "../ParentProfile/Store/StudentsStore";
import CardBasket from "../../../componets/BasketCard/CardBasket";
import {FilterFoodItem} from "../../../componets/FilterFoodItem/FilterFoodItem";

type props = {
    productsStore: ProductsStore;
    studentStore: StudentsStore;
}

@inject("productsStore", 'studentStore')
@observer
class ProductMenu extends React.Component {
    get injected(): props {
        return this.props as props;
    }

    async componentDidMount() {
        await this.injected.studentStore.LoadStudent();
        await this.injected.productsStore.GetProduct();        // ченки lifecycly hooks и сделай все красиво бро
    }

    //Todo можно сделать штуку, с map, который хранит кол во колонок!
    render() {
        let {productsStore, studentStore} = this.injected;

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
                    <LeftMenu calendar={productsStore.Calendar} student={studentStore.Students}/>
                    <div style={{display: "flex", flexDirection: "column", gap: "20px"}}>
                        <FilterFoodItem/>
                        <div style={{display: "flex", flexDirection: "column", gap: "20px"}}>
                            {productsStore.FoodCards.map(foodColumn =>
                                <div style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    gap: "20px"
                                }}> {foodColumn.map(food =>
                                    <CardFood
                                        key={food.id}
                                        product={food}
                                        addToBasket={(e: IProduct) => productsStore.SelectProduct(e)}/>)}
                                </div>)}
                        </div>
                    </div>
                    <CardBasket basket={productsStore.Basket}/>
                </div>
            </div>
        );
    }
}

export default ProductMenu