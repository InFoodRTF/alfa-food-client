import {action, computed, makeObservable, observable} from "mobx";
import ILoaderPagination from "../Model/Interface/ILoaderPagination";
import IToken from "../Model/Interface/IToken";
import PaginationReq from "./IPaginatonLoad";

class LoaderPagination<T> extends PaginationReq implements ILoaderPagination {
    @observable
    private CanLoad: boolean = true;
    @observable
    private OffSet: number = 0;
    @observable
    private LoadTotal: number = -1;
    @observable
    public List: T[] = []

    @computed
    public get LoadMore(): boolean {
        return this.CanLoad;
    }

    @action
    async LoadData(): Promise<void> {
        console.log("пошли заказы")
        let {
            newData,
            totalLoad
        } = await this.GetDataByPagination<T>(this.Token, this.Url + `?limit=${this.Limit}&offset=${this.OffSet}`)   // ApiClient можно вынести, тогда этот класс будет полностью независимы
        this.List = [...this.List, ...newData];
        this.LoaderUpdate(totalLoad)
    }

    constructor(private readonly Limit: number, private Token: IToken, private Url: string = "") {
        super()
        makeObservable(this)
    }

    @action
    private LoaderUpdate(loadTotal: number): void {
        this.OffSet += this.Limit
        this.LoadTotal = loadTotal;
        this.CanLoad = this.List.length !== this.LoadTotal
    }
}

export default LoaderPagination;