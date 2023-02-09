import OrderItem from "./OrderItem";
import MealCategory from "../Enum/MealCategory";

class Order {
    id: number = 0;
    order_items: OrderItem[] = [];
    order_date: Date = new Date();
    date_ordered: Date = new Date();
    meal_category: MealCategory = MealCategory.DontKnow;
    student_id: number = 0;
}

export default Order