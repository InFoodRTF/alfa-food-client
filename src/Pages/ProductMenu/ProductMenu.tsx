import React from "react";
import Navibar from "../../componets/Navbar/Navibar";
import {inject, observer} from "mobx-react";
import ProductsStore from "./ProductsStore";
import CardFood, {IProduct} from "../../componets/FoodCard/CardFood";
import LeftMenu from "../../componets/LeftMenuItem/LeftMenu";
import StudentsStore from "../UsersMenu/Profile/Parent/Store/StudentsStore";
import CardBasket from "../../componets/BasketCard/CardBasket";

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

    render() {
        let {productsStore, studentStore} = this.injected;
        return (
            <div>
                <body style={{background: "#F8F8F8"}}>
                <Navibar/>
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "20px",
                    paddingLeft: "400px",
                    paddingTop: "76px"
                }}>
                    <LeftMenu calendar={productsStore.Calendar} student={studentStore.Students}/>
                    <div style={{display: "flex", flexDirection: "column", gap: "20px", columnCount: 3}}>
                        <div style={{display: "flex", flexDirection: "row", gap: "20px"}}>
                            {productsStore.FoodCards.map(food => <CardFood key={food.id} product={food} addToBasket={(e: IProduct) => productsStore.SelectProduct(e)}/>)}
                        </div>
                    </div>
                    <CardBasket basket={productsStore.Basket}/>
                </div>
                </body>
            </div>
        );
    }
}

export default ProductMenu