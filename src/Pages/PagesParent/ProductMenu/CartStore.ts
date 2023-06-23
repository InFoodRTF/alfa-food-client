import {action, computed, makeObservable, observable} from "mobx";
import {ICartInfo} from "./Component/Cart/CartView";
import CalendarSwitch from "./Model/CalendarSwitch";
import Requests from "../../../Api/Requests";
import {BaseItemStore, Item} from "../../../Lib/BaseItemStore";

// undefined - при первом запуске корзины, это загруженная коризна с сервера, а в ней нету категорий, поэтому и undefined!!
export default class CartStore extends BaseItemStore {
    @observable
    public SelectedStudentId: number = -1;

    constructor(public Calendar: CalendarSwitch) {
        super();
        makeObservable(this);
    }

    @computed
    get sum() {
        return 0; // TODO Cумму нужно реализовать !!
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
        await this.getDataByToken(Requests.GetCart); // TODO ДУмать как часто нужно кидать запрос на cart (идея запросов другая не как сейчас. Вадим знает)
    }

    @action
    public async UpLoadProduct(menuItem_id: number): Promise<void> {
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
            this.Items[item.meal_category].find(e => e.id === item.id)!.quantity++; // а может можно проще
        }
    }

    @action
    async remove(item: Item) {
        await this.postByToken(Requests.RemoveProductFromCart, {menuitem_id: item.id});
        if (item.quantity === 1) {
            this.extract(item);
        } else {
            this.Items[item.meal_category].find(e => e.id === item.id)!.quantity--;  // есть "!" возможно будет какой-нибудь косяк
        }
    }

    @action
    public async changeCart() {
        console.log(this.SelectedStudentId)
        if (this.SelectedStudentId === -1) return;

        this.clear();
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


    private extract(item: Item) {
        const index = this.Items[item.meal_category].indexOf(item);
        delete this.Items[item.meal_category][index];
    }

    private IsPuttedItem(item: Item): boolean {
        return this.Items[item.meal_category] !== undefined && this.Items[item.meal_category].find(e => e.id === item.id) !== undefined;
    }

    @action
    private PutNewItem(item: Item) {
        if (this.Items[item.meal_category] === undefined) {
            this.Items[item.meal_category] = observable<Item>([]);
        }

        item.quantity = 1;
        this.Items[item.meal_category].push(item);
    }

    DownloadItems(): Promise<void> {
        return Promise.resolve(undefined);
    }
}
