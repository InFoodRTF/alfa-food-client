import StoreAdapterApi from "../../../../Api/StoreAdapterApi";
import CalendarSwitch from "../../../ParentPages/ProductMenu/Model/CalendarSwitch";
import Requests from "../../../../Api/Requests";
import Grade from "../../../ParentPages/ParentProfile/Store/Grade";
import {action, computed, makeObservable, observable, toJS} from "mobx";
import {IStudent} from "../../../ParentPages/ParentProfile/Store/IStudent";
import {AttendedGrade} from "./attendedGrade";
import MealCategory from "../../../../Model/Enum/MealCategory";
import {getStringMealCategory} from "../../../../Lib/Transormators";

export class GradesStore extends StoreAdapterApi {
    @observable
    grades: { [gradeName: string]: AttendedGrade; } = {};
    @observable
    calendar: CalendarSwitch;
    @observable
    SelectedGradeName: string = '';
    @observable
    SelectedMealCategory: MealCategory = MealCategory.breakfast;

    constructor(calendar: CalendarSwitch) {
        super();
        this.calendar = calendar;
        makeObservable(this)
    }

    @action
    public ChangeMealCategory(mealCategory: MealCategory): void {
        this.SelectedMealCategory = mealCategory;
    }
    @action
    changeSelectGrade(GradeName: string) {
        this.SelectedGradeName = GradeName
    }

    @computed
    get GetGradeStudent(): IStudent[] {
        if (this.grades[this.SelectedGradeName] === undefined && this.grades[this.SelectedGradeName] === undefined )
            return []

        return this.grades[this.SelectedGradeName].attended_students.map(x => x.student);
    }


    @action
    async getGrades(): Promise<void> {
        let grades = await this.getDataByToken<Grade[]>(Requests.GetGrades)
        for (let grade of grades) {
            this.grades[grade.name] = {attended_students: []};
        }
    }

    @action
    async LoadGrade(): Promise<void> {
        let attendedGrade = await this.getDataByToken<AttendedGrade>(
            Requests.GetAttendancesStudent(this.SelectedGradeName,
                getStringMealCategory(this.SelectedMealCategory),
                this.calendar.CurDate))

        this.grades[this.SelectedGradeName].attended_students = attendedGrade.attended_students
    }
}