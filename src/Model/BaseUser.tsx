import IUser from "./Interface/IUser";
import Role from "./Enum/Role";

class BaseUser implements IUser{
    first_name: string = '';
    last_name: string = '';
    middle_name: string = '';
    role: Role = Role.NonAuth;
    username: string = '';
}

export default BaseUser;