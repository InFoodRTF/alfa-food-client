import React from "react";
import {MealTime} from "./meal-time";
class Grade {
    name: string = "";
    shift: number = 0;
    teacher: string = "";
    meal_time: MealTime = new MealTime();
}

export default Grade;