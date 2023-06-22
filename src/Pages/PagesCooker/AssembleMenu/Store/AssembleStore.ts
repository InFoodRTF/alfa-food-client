
import CalendarSwitch from "../../../PagesParent/ProductMenu/Model/CalendarSwitch";
import {CookerHttp} from "../../../../Api/Requests";
import {Menu} from "./Models/Menu";
import {action, makeObservable, observable} from "mobx";
import {BaseItemStore} from "../../../../Lib/BaseItemStore";
import {Item, ItemOrderResponse, ItemOrderType} from "../../../PagesParent/ProductMenu/ProductsMenu";
import {IProduct} from "../../../../componets/FoodCard/CardFood";

interface RequestProductInMenu {
    product_id: number,
    meal_category: string,
    menu_id: number,
}

export class AssembleStore extends BaseItemStore {
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
    RemoveMenuId() { // todo Название так себе
        this.SelectedMenuId = undefined;
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
        this.itemsClear()

        if (this.SelectedMenuId !== undefined) {
            const menu = await this.getDataByToken<ItemOrderResponse>(CookerHttp.GetProductByMenu(this.SelectedMenuId.toString()));
            this.Items = menu.items
            this.SelectedMealCategory = Object.keys(menu.items)[0];
        } else {
            console.log('не выбрано меню');
        }

    }

    @action
    async DownloadAvailableProduct() {
        this.AvailableIProduct = await this.getDataByToken<IProduct[]>(CookerHttp.GetAvailableItem);
    }

    @action
    async addNewInMenu(productId: number) { // todo слишком add методов
        if (this.SelectedMenuId === undefined){
            console.log("меню не выбранно ")
            return ;
        }
        if (this.SelectedMealCategory === undefined){
            console.log("не выбранна категория блюд: хз как это возможно!!")
            return ;
        }

            await this.postByToken<{}, RequestProductInMenu>(CookerHttp.AddProductInMenu, {
            menu_id: this.SelectedMenuId,
            product_id: productId,
            meal_category: this.SelectedMealCategory
        })

        // todo хз насчёт правильности

    }
    // todo слишком add методов, здесь немного кринж)() 2 add практичес
    @action
    async addInMenu(item: Item) {
        if (this.SelectedMenuId === undefined){
            console.log("меню не выбранно ")
            return ;
        }
        if (this.SelectedMealCategory === undefined){
            console.log("не выбранна категория блюд: хз как это возможно!!")
            return ;
        }

        const resp = await this.postByToken<{}, RequestProductInMenu>(CookerHttp.AddProductInMenu, {
            menu_id: this.SelectedMenuId,
            product_id: item.product.id,
            meal_category: this.SelectedMealCategory
        })

        if (resp.status === 200){
            ++item.quantity;
        }
    }

    @action
    async removeFromMenu(item: Item) { // todo повтор кодааааа
        if (this.SelectedMenuId === undefined){
            console.log("меню не выбранно ")
            return ;
        }
        if (this.SelectedMealCategory === undefined){
            console.log("не выбранна категория блюд: хз как это возможно!!")
            return ;
        }

        const Resp = await this.postByToken<ItemOrderType,{menuitem_id: number}>(CookerHttp.RemoveProduct, {menuitem_id: item.id})
        if (Resp.status === 200){
            --item.quantity;
        }

    }

    @action
    async downloadAvailableMenu() {
        this.Menus = await this.getDataByToken<Menu[]>(CookerHttp.GetMenuByDate(this.Calendar.CurDate))
    }
}