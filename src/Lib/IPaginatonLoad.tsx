import IToken from "../Model/Interface/IToken";

export default interface IPagination {

    GetData<T>(token: IToken, url: string): Promise<{ newData: T[], totalLoad: number }>;
}