import OrderItem from "./OrderItem";
import MealCategory from "../Enum/MealCategory";
import Student from "../Student";
import student from "../Student";

class Order {
    id: number = 0;
    order_items: OrderItem[] = [];
    order_date: Date = new Date();
    date_ordered: Date = new Date();
    meal_category: MealCategory = MealCategory.DontKnow;
    student: Student = new student();
}

export default Order