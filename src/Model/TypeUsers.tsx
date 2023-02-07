import ICooker from "./Interface/ICooker";
import NotAuthUser from "./Role/NotAuthUser";
import Parent from "./Role/Parent";
import Teacher from "./Role/Teacher";

type Users = Parent | ICooker | NotAuthUser | Teacher;

export default Users;