import { ButItem } from "./ButItem";
import React from "react";
import string from "../../../../../Model/Enum/MealCategory";


// todo штука с mealcategory устаревшая, она не нужно, если что mealcategory могут быть кастомные!!!!
export class MealCategoryFilter extends React.Component<{value: string, changeMealCategory: () => void}> {
    render() {
        const {value, changeMealCategory} = this.props;
        return (
                <ButItem w={124} h={44} value={value} ChangeMealCategory={() => changeMealCategory()}/>
        )
    }
}
