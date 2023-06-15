import CalendarSwitch from "../../../PagesParent/ProductMenu/Model/CalendarSwitch";
import {CookerHttp} from "../../../../Api/Requests";
import {Menu} from "./Models/Menu";
import {action, keys, makeObservable, observable, toJS} from "mobx";
import {BaseMenuStore} from "../../../../Lib/BaseMenuStore";
import {Item, ItemOrder, ItemOrderType} from "../../../PagesParent/ProductMenu/ProductsMenu";
import {IProduct} from "../../../../componets/FoodCard/CardFood";

interface RequestProductInMenu {
    product_id: number,
    meal_category: string,
    menu_id: number,
}

export class AssembleStore extends BaseMenuStore {
    @observable
    Menus: Menu[] = [];
    @observable
    SelectedMenuId?: number;
    @observable
    AvailableIProduct: IProduct[] = []
    @observable
    IsOpenAllProductMenu: boolean = false; // пока хз либо state либо это: это по идей быстрее работает


    constructor(public Calendar: CalendarSwitch) {
        super();
        makeObservable(this);
    }

    @action
    ChangeIsOpen() {
        this.IsOpenAllProductMenu = !this.IsOpenAllProductMenu;
    }

    @action
    ChangeSelectedMenu(menuId: number) {
        this.SelectedMenuId = menuId;
    }

    @action
    override async DownloadMenu() { // todo вообще это тоже можно скрыть
        console.log("зашел в лоад")
        this.menu = {}
        if (this.SelectedMenuId !== undefined) {
            console.log("прошел проверку ")
            const menu = await this.getDataByToken<ItemOrder>(CookerHttp.GetProductByMenu(this.SelectedMenuId.toString()));
            this.menu = menu.items;
            this.SelectedMealCategory = Object.keys(menu.items)[0];
        } else {
            console.log('не выбрано меню');
        }

    }

    @action
    async DownloadAvailableProduct() {
        const x = await this.getDataByToken<IProduct[]>(CookerHttp.GetAvailableItem);
        if (x.length !== 0)
            this.AvailableIProduct = x;
        this.ChangeIsOpen();
    }

    @action
    async addInMenuNew(productId: number) {
        if (this.SelectedMenuId === undefined) {
            console.log("меню не выбранно ")
            return;
        }
        if (this.SelectedMealCategory === undefined) {
            console.log("не выбранна категория блюд: хз как это возможно!!")
            return;
        }

        await this.postByToken<{}, RequestProductInMenu>(CookerHttp.AddProductInMenu, {
            menu_id: this.SelectedMenuId,
            product_id: productId,
            meal_category: this.SelectedMealCategory
        })

        // todo хз насчёт правильности

    }

    @action
    async addInMenu(item: Item) {
        if (this.SelectedMenuId === undefined) {
            console.log("меню не выбранно ")
            return;
        }
        if (this.SelectedMealCategory === undefined) {
            console.log("не выбранна категория блюд: хз как это возможно!!")
            return;
        }

        const resp = await this.postByToken<{}, RequestProductInMenu>(CookerHttp.AddProductInMenu, {
            menu_id: this.SelectedMenuId,
            product_id: item.idProduct,
            meal_category: this.SelectedMealCategory
        })

        if (resp.status === 200) {
            ++item.quantity;
        }
    }

    @action
    async removeFromMenu(item: Item) { // todo повтор кодааааа
        if (this.SelectedMenuId === undefined) {
            console.log("меню не выбранно ")
            return;
        }
        if (this.SelectedMealCategory === undefined) {
            console.log("не выбранна категория блюд: хз как это возможно!!")
            return;
        }

        const Resp = await this.postByToken<ItemOrderType, {
            menuitem_id: number
        }>(CookerHttp.RemoveProduct, {menuitem_id: item.id})
        if (Resp.status === 200) {
            --item.quantity;
        }

    }

    @action
    async downloadAvailableMenu() {
        this.Menus = await this.getDataByToken<Menu[]>(CookerHttp.GetMenuByDate(this.Calendar.CurDate))
    }
}