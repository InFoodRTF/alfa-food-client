import React from "react";
import { SearchCard } from "../../Pages/PagesTeacher/MarkClass/Component/SearchCard/SearchCard";
import {CookingFoodCard} from "../CookingFoodCard/CookingFoodCard";
import {IProduct} from "../FoodCard/CardFood";

interface props {
    products: IProduct[]
    onClick: (p: IProduct) => void;
}
export class ChooseProductAdd extends React.Component<props>{
    render() {
        const {products} = this.props;
        return (
            <div style={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                width: "1119px",
                marginTop: "26px",
                marginLeft: "auto",
                marginRight: "auto",
                paddingBottom: "60px",
                minHeight: "620px"
            }}>
                <SearchCard/>
                {products !== undefined && products.map((p) => <CookingFoodCard product={p} onClick={() => this.props.onClick(p)} />)}
            </div>
        )
    }
}
