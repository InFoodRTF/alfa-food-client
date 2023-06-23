import {makeAutoObservable, observable} from "mobx";
import AuthKey from "../../../Model/AuthKey";
import LoaderPagination from "../../../Lib/LoaderPagination";
import Requests from "../../../Api/Requests";
import {Order} from "./component/OrderCard/OrderCard";

// todo вкидываю идею - сделать, interface на store который будет выполнять условия пагинаций, по идей топ, так как один стор будет работать с одними данными, и по логике все ок должно быть
// todo или абстрактый класс, я же их так люблю))))
class OrdersStore {
    @observable
    Loader: LoaderPagination<Order> = new LoaderPagination<Order>(2, AuthKey.GetFromLocalStorage(), Requests.Orders); // аааа почему туда пихается все в этом мире)))
    constructor() {
        makeAutoObservable(this);
    }
}

export default OrdersStore;