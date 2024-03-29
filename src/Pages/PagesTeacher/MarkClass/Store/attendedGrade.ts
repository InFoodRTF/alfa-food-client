import {IStudent} from "../../../Store/IStudent";
import {action, makeObservable, observable} from "mobx";

export interface AttendedGrade {
    attended_students: AttendedStudent[]
}

export interface AttendedStudent {
    id: number;
    student?: IStudent;
    mark_attendance: boolean;
    absent_reason: string;

}