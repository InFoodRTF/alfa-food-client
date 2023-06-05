import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import {inject, observer} from "mobx-react";
import OrdersStore from "./OrdersStore";
import {OrderHistoryCard} from "./component/OrderCard/OrderCard";
import UserStore from "../../UserStore";
import {PageComponent} from "../../Injected";


type props = {
    orderStore: OrdersStore;
    userStore: UserStore;
}


@inject("orderStore", "userStore")
@observer
class OrdersMenu extends PageComponent<props> {
    async componentDidMount() {
        await this.injected.orderStore.Loader.LoadData();
    }

    componentWillUnmount() {
    }

    render() {
        let {orderStore, userStore} = this.injected;
        return (
            <div>
                <InfiniteScroll hasMore={orderStore.Loader.LoadMore}
                                loader={"загрузка....."}
                                next={() => orderStore.Loader.LoadData()}
                                dataLength={orderStore.Loader.List.length}>
                    {orderStore.Loader.List.map(order => <OrderHistoryCard key={order.id} order={order}
                                                                    user={userStore.User}/>)}
                </InfiniteScroll>
            </div>
        );
    }
}

export default OrdersMenu;