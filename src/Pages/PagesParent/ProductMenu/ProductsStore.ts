import {action, computed, makeObservable, observable} from "mobx";
import CalendarSwitch from "./Model/CalendarSwitch";
import {ItemOrder} from "./ProductsMenu";
import Requests from "../../../Api/Requests";
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
    override async LoadMenu() :Promise<void> {
        const menu: ItemOrder = await this.getDataByToken<ItemOrder>(Requests.GetMenu(this.Calendar.CurDate));
        this.menu = {}

        this.menu = menu.items;
    }
}

