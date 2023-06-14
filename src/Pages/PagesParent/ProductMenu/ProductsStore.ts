import {action, makeObservable, observable} from "mobx";
import CalendarSwitch from "./Model/CalendarSwitch";
import {ItemOrder} from "./ProductsMenu";
import Requests, {CookerHttp} from "../../../Api/Requests";
import {BaseMenuStore} from "../../../Lib/BaseMenuStore";

export default class ProductsStore extends BaseMenuStore { // todo не лучшее название
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
        this.menu = {}
        const menu: ItemOrder = await this.getDataByToken<ItemOrder>(Requests.GetMenu(this.Calendar.CurDate));
        this.SelectedMealCategory = Object.keys(menu.items)[0];
        this.menu = menu.items;
    }
}

