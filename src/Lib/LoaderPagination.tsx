import {makeAutoObservable} from "mobx";
import ILoaderPagination from "../Model/Interface/ILoaderPagination";
import IToken from "../Model/Interface/IToken";
import IPagination from "./IPaginatonLoad";

class LoaderPagination<T> implements ILoaderPagination {
    private CanLoad: boolean = true;
    private OffSet: number = 0;
    private LoadTotal: number = -1;
    public List: T[] = []

    public get LoadMore(): boolean {
        return this.CanLoad;
    }

    async LoadData(): Promise<void> {
        console.log("пошли заказы")
        let {
            newData,
            totalLoad
        } = await this.Api.GetDataByPagination<T>(this.Token, this.Url + `?limit=${this.Limit}&offset=${this.OffSet}`)   // ApiClient можно вынести, тогда этот класс будет полностью независимы
        this.List = [...this.List, ...newData];
        this.LoaderUpdate(totalLoad)
    }

    constructor(private readonly Limit: number, private Token: IToken, private Url: string = "", private Api: IPagination) {
        makeAutoObservable(this)
    }

    private LoaderUpdate(loadTotal: number): void {
        this.OffSet += this.Limit
        this.LoadTotal = loadTotal;
        this.CanLoad = this.List.length !== this.LoadTotal
    }
}

export default LoaderPagination;