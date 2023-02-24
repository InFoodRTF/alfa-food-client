import IToken from "../Model/Interface/IToken";

export default interface IPagination {

    GetDataByPagination<T>(token: IToken, url: string): Promise<{ newData: T[], totalLoad: number }>;
}