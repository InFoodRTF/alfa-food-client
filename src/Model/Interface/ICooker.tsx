import IUser from "./IUser";

interface ICooker extends IUser{
    CreateDish(): void
}

export default ICooker;