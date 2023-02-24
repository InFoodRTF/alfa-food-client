import IToken from "../Interface/IToken";
import AuthKey from "../AuthKey";

abstract class UseToken {
    Token: IToken = AuthKey.GetFromLocalStorage()  // возможная реализация Token, пока выглядит так "абстрактый класс ради абстракт класса"
}

