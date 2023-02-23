import React from "react";

export default interface ILoaderPagination {
    get LoadMore(): boolean
    LoadData(): Promise<void>
}

