import { ButItem } from "./ButItem";
import React from "react";
import mealCategory from "../../../../../Model/Enum/MealCategory";


// todo штука с mealcategory устаревшая, она не нужно, если что mealcategory могут быть кастомные!!!!
export class FilterFoodItem extends React.Component<{ChangeMealCategory: (e: mealCategory) => void}> {
    render() {
        return (
            <div style={{display: "flex", flexDirection: "row", gap: "20px", height: "44px"}}>
                <ButItem w={124} h={44} text={"Завтрак"} ChangeMealCategory={() => this.props.ChangeMealCategory(mealCategory.breakfast)}/>
                <ButItem w={94} h={44} text={"Обед"} ChangeMealCategory={() => this.props.ChangeMealCategory(mealCategory.lunch)}/>
                <ButItem w={129} h={44} text={"Полдник"} ChangeMealCategory={() => this.props.ChangeMealCategory(mealCategory.dinner)}/>
            </div>
        )
    }
}
