import OrderItem from "./OrderItem";
import MealCategory from "../Enum/MealCategory";
import Student from "../Student";

// зачем классы если из можно сделать интерфейсами?
class Order {
    id: number = 0;
    order_items: OrderItem[] = [];
    order_date: Date = new Date();
    date_ordered: Date = new Date();
    meal_category: MealCategory = MealCategory.DontKnow;
    student: Student = new Student();
}

export default Order