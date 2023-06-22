import {action, IObservableArray, makeObservable, observable} from "mobx";
import CalendarSwitch from "./Model/CalendarSwitch";
import {ItemOrderResponse, ItemOrderType} from "./ProductsMenu";
import Requests from "../../../Api/Requests";
import {BaseItemStore} from "../../../Lib/BaseItemStore";

export default class ProductsStore extends BaseItemStore { // todo не лучшее название
    @observable
    Calendar: CalendarSwitch;

    constructor(calendarSwitch: CalendarSwitch) {
        super();
        makeObservable(this)
        this.Calendar = calendarSwitch;
    }


    @action
    override async DownloadMenu() :Promise<void> {
        console.log("зашел в лоад")
        this.Items = {}
        const menu = await this.getDataByToken<ItemOrderResponse>(Requests.GetMenu(this.Calendar.CurDate));
        this.SelectedMealCategory = Object.keys(menu.items)[0];
        this.Items = menu.items;
    }
}

