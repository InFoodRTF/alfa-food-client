import {action, computed, makeObservable, observable, toJS} from "mobx";
import {ICartInfo} from "./Component/BasketCard/CartView";
import CalendarSwitch from "./Model/CalendarSwitch";
import Requests from "../../../Api/Requests";
import {Item, ItemOrderType,} from "./ProductsMenu";
import {BaseMenuStore} from "../../../Lib/BaseMenuStore";
import {createObservableArray} from "mobx/dist/types/observablearray";

export default class CartStore extends BaseMenuStore {
    @observable
    public SelectedStudentId: number = -1;

    constructor(public Calendar: CalendarSwitch) {
        super();
        makeObservable(this);
    }

    @computed
    get isEmpty(): boolean {
        return Object.keys(this.menu).length === 0; // по идей можно вынести в baseMenuStore
    }

    @computed
    get sum() {
        return 0; // TODO Cумму нужно реализовать !!
    }

    @action
    Clear() {
        this.menu = {};
    }

    @action
    async CreateOrder() {
        if (!this.isEmpty)
            await this.postByToken<{}, {}>(Requests.CreateOrder, {});
        else
            console.log("корзина пуста")
    }

    @action
    async UpdateCart() {
        await this.getDataByToken(Requests.GetCart); // TODO ДУмать как часто нужно кидать запрос на cart
    }

    @action
    public async UpLoadProduct(menuItem_id: number) {
        await this.postByToken(Requests.AddProductInCart, {menuitem_id: menuItem_id});
    }

    @action // хз насчёт годности этого isConnectedWithServer
    public async Add(item: Item, isConnectedWithServer: boolean): Promise<void> {
        if (isConnectedWithServer) {
            await this.UpLoadProduct(item.id);
        }

        if (!this.IsPuttedItem(item)) {
            this.PutNewItem(item);
        } else {
            this.menu[item.meal_category].find(e => e.id === item.id)!.quantity++;
        }
    }

    @action
    async Extract(item: Item): Promise<void> {
        await this.postByToken(Requests.RemoveProductFromCart, {menuitem_id: item.id});
        if (item.quantity === 1) {
            this.Remove(item);
        } else {
            this.menu[item.meal_category].find(e => e.id === item.id)!.quantity--;  // много ! возможно будет какой-нибудь косяк
        }
    }

    @action
    public async changeCart() {
        console.log(this.SelectedStudentId)
        if (this.SelectedStudentId === -1) return;

        this.menu = {}
        let cartInfo = await this.getDataByToken<ICartInfo>(Requests.SwitchCart(this.SelectedStudentId, this.Calendar.CurDate))
        console.log(cartInfo)
        for (let item of cartInfo.cart_items) {
            item.product.price = Number(item.product.price);
            for (let j = 0; j < item.quantity; j++) {
                this.Add(item, false)
            }
        }
    }

    @action
    ChangeStudentId(studentId: string) {
        this.SelectedStudentId = Number(studentId);
        console.log("id сменили: " + studentId)
    }


    private Remove(item: Item) {
        const index = this.menu[item.meal_category].indexOf(item);
        delete this.menu[item.meal_category][index];
    }

    @action
    private IsPuttedItem(item: Item): boolean {
        return this.menu[item.meal_category] !== undefined && this.menu[item.meal_category].find(e => e.id === item.id) !== undefined;
    }

    @action
    private PutNewItem(item: Item) {
        if (this.menu[item.meal_category] === undefined) {
            this.menu[item.meal_category] = observable<Item>([]);
        }
        console.log(toJS(this.menu),"новый item")
        item.quantity = 1;
        this.menu[item.meal_category].push(item);
        console.log(toJS(this.menu),"добавлен item")
    }

    DownloadMenu(): Promise<void> {
        return Promise.resolve(undefined);
    }
}
