import IUser from "../ViewModel/Interface/IUser";
import Token from "../ViewModel/Token";
import UserParent from "../ViewModel/UserParent";
class UserStore {
    public Token: Token = new Token();
    public User: IUser = new UserParent();

    async GetUser(){
        this.User = await this.Token.GetUser()
    }
}

export default UserStore;