import StoreAdapterApi from "../../../../Api/StoreAdapterApi";
import CalendarSwitch from "../../../PagesParent/ProductMenu/Model/CalendarSwitch";
import Requests from "../../../../Api/Requests";
import Grade from "../../../Store/Grade";
import {action, computed, makeObservable, observable} from "mobx";
import {AttendedGrade, AttendedStudent} from "./attendedGrade";
import MealCategory from "../../../../Model/Enum/MealCategory";
import {getStringMealCategory} from "../../../../Lib/Transormators";
import grade from "../../../Store/Grade";

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
    changeSelectGrade(gradeName: string) {
        this.SelectedGradeName = gradeName
    }

    @action
    async changeMarkAttendance(attendStudent: AttendedStudent) {
        console.log("work", this.GetSelectedGradeStudent)
        attendStudent.mark_attendance = !attendStudent.mark_attendance
        await this.patchByToken<{}, {mark_attendance: string}>(Requests.ChangeAttendances(attendStudent.id),
            {mark_attendance: attendStudent.mark_attendance ? "true": "false"}); // todo здесь очень интересная система
    }

    @computed
    get GetSelectedGradeStudent(): AttendedStudent[] {
        if (this.grades[this.SelectedGradeName] === undefined && this.grades[this.SelectedGradeName] === undefined)
            return []

        return this.grades[this.SelectedGradeName].attended_students
    }

    @action
    async getGrades(): Promise<void> {
        console.log("градес ")
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

        this.grades[this.SelectedGradeName].attended_students = attendedGrade.attended_students;
    }
}