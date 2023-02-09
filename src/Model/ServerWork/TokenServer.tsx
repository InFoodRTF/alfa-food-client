import IToken from "../Interface/IToken";


export default abstract class TokenServer implements IToken {
    public token: string | null = null;


}