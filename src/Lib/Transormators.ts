import {IPerson} from "../Model/Interface/IPerson";
import MealCategory from "../Model/Enum/MealCategory";

// TODO было бы круто сделать расширение, а не вот эти методы странные
declare global {
    export interface IPerson {
        getFullName(student: string): string;
    }
}
// IPerson.prototype.getFullName
export function getInitials(person: IPerson) : string {
    return `${person.middle_name} ${person.first_name[0]}. ${person.last_name[0]}`
}

export function getFullName(person: IPerson): string {
    return `${person.first_name} ${person.middle_name} ${person.last_name}`
}

export function getStringMealCategory(mealCategory: MealCategory) :string {
    switch (mealCategory) {
        case MealCategory.breakfast:
            return "Завтрак"
        case MealCategory.dinner:
            return "Обед"
        case MealCategory.lunch:
            return "Полдник"
        default:
            return "не выбрано"
    }
}