import BaseUser from "./BaseUser";
import IParent from "../Interface/IParent";
import Role from "../Enum/Role";

class Parent extends BaseUser implements IParent {
    balance: number = 0;
    readonly role = Role.Parent;

    BuyFood(): void {
    }
}

export default Parent