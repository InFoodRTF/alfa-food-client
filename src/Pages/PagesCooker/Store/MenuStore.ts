import StoreAdapterApi from "../../../Api/StoreAdapterApi";
import CalendarSwitch from "../../PagesParent/ProductMenu/Model/CalendarSwitch";
import {CookerHttp} from "../../../Api/Requests";
import {Menu} from "./Models/Menu";


export class MenuStore extends StoreAdapterApi {
    Menus: Menu[] = [];
    constructor(public Calendar: CalendarSwitch) {
        super();
    }

    async loadAvailableMenu() {
        this.Menus = await this.getDataByToken<Menu[]>(CookerHttp.GetMenuByDate(this.Calendar.CurDate))
    }
}