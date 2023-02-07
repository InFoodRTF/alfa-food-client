import BaseUser from "./BaseUser";
import ITeacher from "../Interface/ITeacher";

class Teacher extends BaseUser implements ITeacher{
    CheckStudent(): void {
    }

}

export default Teacher;