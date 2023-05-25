import {IPerson} from "../../../../Model/Interface/IPerson";
import {IStudent} from "../../../ParentPages/ParentProfile/Store/IStudent";

export interface AttendedGrade {
    attended_students: IStudentAttend[]
}
interface IStudentAttend {
    student: IStudent;
    mark_attendance: boolean
    absent_reason: string;
}