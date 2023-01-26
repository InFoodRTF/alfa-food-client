import IUser from "./Interface/IUser";
import Profile from "../Entity/Profile";
import Role from "./Enum/Role";
import role from "./Enum/Role";
class UserParent implements IUser{
    first_name: string = '';
    role: Role = role.NonAuth;
    last_name: string = '';
    profile: Profile = new Profile();
    username: string = '';
    balance: number = 0;
}

export default UserParent