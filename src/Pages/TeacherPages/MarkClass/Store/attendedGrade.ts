import {IStudent} from "../../../ParentPages/ParentProfile/Store/IStudent";
import {action, makeObservable, observable} from "mobx";

export interface AttendedGrade {
    attended_students: AttendedStudent[]
}

export interface AttendedStudent {
    student?: IStudent;
    mark_attendance: boolean;
    absent_reason: string;

}