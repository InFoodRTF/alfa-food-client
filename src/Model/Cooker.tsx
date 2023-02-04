import BaseUser from "./BaseUser";
import ICooker from "./Interface/ICooker";
import Role from "./Enum/Role";

class Cooker extends BaseUser implements ICooker{
    readonly role = Role.Cooker;

    CreateDish(): void {
    }
}

export default Cooker;