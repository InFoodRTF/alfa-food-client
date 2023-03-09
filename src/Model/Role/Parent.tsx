import BaseUser from "./BaseUser";
import IParent from "../Interface/IParent";
import Role from "../Enum/Role";

class Parent extends BaseUser implements IParent {
    readonly role = Role.Parent;
    balance: number = 0;


    BuyFood(): void {
    }
}

export default Parent