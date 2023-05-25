import {action, computed, makeObservable, observable} from "mobx";
import {IProduct} from "../../../componets/FoodCard/CardFood";
import storeAdapterApi from "../../../Api/StoreAdapterApi";
import {ICartInfo} from "./Component/BasketCard/CartView";
import CalendarSwitch from "./Model/CalendarSwitch";
import Requests from "../../../Api/Requests";

export default class CartStore extends storeAdapterApi {
    @observable
    public Products: IProduct[] = [];
    @observable
    public countItems: { [id: number]: number; } = {}; // так же изучить computed
    @observable
    public StudentId: number = -1;
    @observable
    public Calendar: CalendarSwitch;
    constructor(calendar: CalendarSwitch) {
        super();
        makeObservable(this);
        this.Calendar = calendar;
    }

    @computed
    get isEmpty() : boolean{
        return this.Products.length === 0;
    }

    @computed
    get sum() {
        if (this.Products.length !== 0) {
            return this.Products.map(prod => prod.price * this.countItems[prod.id]).reduce((prevVal, curVal) => prevVal + curVal)
        }

        return 0;
    }

    @action
    async UpdateCart() {
        await this.getDataByToken(Requests.GetCart); // TODO ДУмать как часто нужно кидать запрос на cart
    }

    @action
    public async UpLoadProduct(product: IProduct) {
        await this.PostByToken(Requests.AddProductInCart, {menuitem_id: product.id});
    }

    @action // хз насчёт годности этого isAsync
    public async Put(product: IProduct, isConnectedWithServer: boolean): Promise<void> {
        if (isConnectedWithServer) {
            await this.UpLoadProduct(product);
        }

        if (!this.IsPutted(product.id)) {
            this.PutNew(product);
        }

        this.countItems[product.id]++;
    }

    @action
    async Extract(product: IProduct): Promise<void> {
        await this.PostByToken(Requests.RemoveProductFromCart, {menuitem_id: product.id});
        if (this.countItems[product.id] === 1) {
            delete this.countItems[product.id];
            this.Remove(product);
        } else {
            this.countItems[product.id]--;
        }
    }

    @action
    public async changeCart() {
        console.log(this.StudentId)
        if (this.StudentId === -1) return;

        this.Products = []
        this.countItems = {};
        let cartInfo = await this.getDataByToken<ICartInfo>(Requests.SwitchCart(this.StudentId, this.Calendar.CurDate))
        console.log(cartInfo)
        for (let item of cartInfo.cart_items) {
            item.product.price = Number(item.product.price);
            // TODO Каординально изменить логику countItem не очень та и нужен на самом деле
            for (let j = 0; j < item.quantity; j++)
                this.Put(item.product, false)
        }
    }

    @action
        ChangeStudentId(studentId: string) {

            this.StudentId = Number(studentId);
            console.log("id сменили: " + studentId)
    }

    // название очень не нравиться поэтому вот -
    // убирает из коризины элемент
    @action
    private Remove(product: IProduct) {
        const index = this.Products.indexOf(product);
        delete this.Products[index];
    }

    @action
    private IsPutted(id: number) {
        return this.countItems[id] !== undefined && this.countItems[id] !== 0;
    }

    //TODO ооо великий рефакторинг, приди и сделай по нормальному плз
    @action
    private PutNew(product: IProduct) {
        this.countItems[product.id] = 0;
        this.Products.push(product);
    }
}
