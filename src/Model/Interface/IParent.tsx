import IUser from "./IUser";

interface IParent extends IUser {
    balance: number;

    BuyFood(): void
}

export default IParent;