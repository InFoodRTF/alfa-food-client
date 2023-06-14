import CalendarSwitch from "../../../PagesParent/ProductMenu/Model/CalendarSwitch";
import {action, makeObservable} from "mobx";
import StoreAdapterApi from "../../../../Api/StoreAdapterApi";
import {CookerHttp} from "../../../../Api/Requests";


interface InfoPdf {
    date: string,
    file_extension: string
}
export class ReportStore extends StoreAdapterApi{

    constructor(public Calendar: CalendarSwitch) {
        super()
        makeObservable(this)
    }

    @action
    DownLoadFile() {
        this.DownloadFile<InfoPdf>(CookerHttp.DownLoadFile, {date: this.Calendar.CurDate, file_extension: "pdf"})
    }
}