import OrderItem from "./OrderItem";
import MealCategory from "../Enum/MealCategory";
import {IStudent} from "../../Pages/ParentPages/Parent/Store/IStudent";


// зачем классы если из инз можно сделать интерфейсами?
interface Order {
    id: number;
    order_items: OrderItem[];
    order_date: Date;
    date_ordered: Date;
    meal_category: MealCategory;
    student: IStudent;
}

export default Order