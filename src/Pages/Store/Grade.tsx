import {MealTime} from "../../Model/meal-time";
import {IStudent} from "./IStudent";
interface Grade {
    name: string;
    shift: number;
    teacher: string;
    meal_time: MealTime[];
    students?: IStudent[]
}

export default Grade;