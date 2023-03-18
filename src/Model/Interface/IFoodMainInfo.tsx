import mealCategory from "../Enum/MealCategory";

export default interface IFoodMainInfo {
    id: number
    name: string;
    price: number;
    description: string;
    grams: number;
    image: string;
    meal_category: mealCategory;
}