import { ButItem } from "./ButItem";
import React from "react";

export class FilterFoodItem extends React.Component {
    render() {
        return (
            <div style={{display: "flex", flexDirection: "row", gap: "20px", height: "44px"}}>
                <ButItem w={124} h={44} text={"Завтрак"}/>
                <ButItem w={94} h={44} text={"Обед"}/>
                <ButItem w={129} h={44} text={"Полдник"}/>
            </div>
        )
    }
}
