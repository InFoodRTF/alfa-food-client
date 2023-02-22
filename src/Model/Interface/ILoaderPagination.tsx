import React from "react";

export default interface ILoaderPagination {
    get GetOffSet(): number
    get GetLimit(): number
    get GetCanLoad(): boolean
    LoaderUpdate(curLoad: number, loadTotal: number): void
}

