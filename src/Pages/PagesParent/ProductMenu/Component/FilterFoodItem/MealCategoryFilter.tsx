import { ButItem } from "./ButItem";
import React from "react";


// todo штука с mealcategory устаревшая, она не нужно, если что mealcategory могут быть кастомные!!!!
export class MealCategoryFilter extends React.Component<{selectedCategory: string,value: string, changeMealCategory: () => void}> {
    render() {
        const {value, changeMealCategory, selectedCategory} = this.props;
        return (
                <ButItem w={124} h={44} value={value} active={selectedCategory === value}  ChangeMealCategory={() => changeMealCategory()}/>
        )
    }
}
