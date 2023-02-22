import {makeAutoObservable} from "mobx";
import ILoaderPagination from "./Interface/ILoaderPagination";

class LoaderPagination implements ILoaderPagination{
    private CanLoad: boolean = true;
    private OffSet: number = 0;
    private LoadTotal: number = -1;
    private readonly Limit: number = 0;  // чет названик вообще такое себе учитывая, что она делат ниже в коде

    get GetOffSet(): number {
        return this.OffSet;
    }

    get GetLimit(): number {
        return this.Limit
    }

    get GetCanLoad(): boolean {
        return this.CanLoad;
    }

    constructor(limit: number) {
        makeAutoObservable(this)
        this.Limit = limit;
    }

    LoaderUpdate(curLoad: number, loadTotal: number): void {
        this.OffSet += this.Limit  // плюсем limit )))
        this.LoadTotal = loadTotal;
        this.CanLoad = curLoad !== this.LoadTotal
    }
}

export default LoaderPagination;