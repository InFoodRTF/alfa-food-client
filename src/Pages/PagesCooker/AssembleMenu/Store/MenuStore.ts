import StoreAdapterApi from "../../../../Api/StoreAdapterApi";
import CalendarSwitch from "../../../PagesParent/ProductMenu/Model/CalendarSwitch";
import {CookerHttp} from "../../../../Api/Requests";
import {Menu} from "./Models/Menu";
import {action, makeObservable, observable} from "mobx";
import {BaseMenuStore} from "../../../../Lib/BaseMenuStore";
import {ItemOrder} from "../../../PagesParent/ProductMenu/ProductsMenu";


export class MenuStore extends BaseMenuStore {
    @observable
    Menus: Menu[] = [];
    @observable
    SelectedMenuId?: number;

    constructor(public Calendar: CalendarSwitch) {
        super();
        makeObservable(this);
    }

    @action
    ChangeSelectedMenu(menuId: number) {
        this.SelectedMenuId = menuId;
    }

    @action
    override async LoadMenu() {
        console.log("зашел в лоад")
        this.menu = {}
        if (this.SelectedMenuId !== undefined) {
            console.log("прошел проверку ")
            const menu = await this.getDataByToken<ItemOrder>(CookerHttp.GetProductByMenu(this.SelectedMenuId.toString()));
            this.menu = menu.items;
        } else {
            console.log('не выбрано меню');
        }
    }

    @action
    async loadAvailableMenu() {
        this.Menus = await this.getDataByToken<Menu[]>(CookerHttp.GetMenuByDate(this.Calendar.CurDate))
    }
}