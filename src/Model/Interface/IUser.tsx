import Role from "../Enum/Role";
import {IPerson} from "./IPerson";

// todo как идея сделать под каждый тип юзера свой интерфем или type, чтоб у каждого был readonly role, пока хз если ли в этом смысл, то интуция, чем говорит)
interface IUser extends IPerson{
    username: string;
    role: Role;
}

export default IUser;