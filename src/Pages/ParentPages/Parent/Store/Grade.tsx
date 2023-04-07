import {MealTime} from "../../../../Model/meal-time";
interface Grade {
    name: string;
    shift: number;
    teacher: string;
    meal_time: MealTime[];
}

export default Grade;