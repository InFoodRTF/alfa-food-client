import StoreAdapterApi from "../../../../Api/StoreAdapterApi";
import CalendarSwitch from "../../../ParentPages/ProductMenu/Model/CalendarSwitch";
import Requests from "../../../../Api/Requests";
import Grade from "../../../ParentPages/ParentProfile/Store/Grade";

export class GradesStore extends StoreAdapterApi {
    grade: Grade[] = [];
    calendar: CalendarSwitch;

    constructor(calendar: CalendarSwitch) {
        super();
        this.calendar = calendar;
    }

    async getGrades(): Promise<void> {
        let grades = await this.GetDataByToken<Grade[]>(Requests.GetGrades)
        for (let grade of grades) {
            this.grade.push(grade)
        }

    }

}