import Role from "../Enum/Role";
import {IPerson} from "./IPerson";

interface IUser extends IPerson{
    username: string;
    role: Role;
}

export default IUser;