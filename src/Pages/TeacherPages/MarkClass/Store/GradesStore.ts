import StoreAdapterApi from "../../../../Api/StoreAdapterApi";
import {IStudent} from "../../../ParentPages/ParentProfile/Store/IStudent";
import CalendarSwitch from "../../../ParentPages/ProductMenu/Model/CalendarSwitch";

export class GradesStore extends StoreAdapterApi {
    Student: IStudent[] = [];
    calendar: CalendarSwitch;

    constructor(calendar: CalendarSwitch) {
        super();
        this.calendar = calendar;
    }

   // GetGradesName(): string[] {

    //}

}