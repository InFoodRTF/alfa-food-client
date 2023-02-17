import React from "react";
import OrderView from "../../componets/Order/Order";
import InfiniteScroll from "react-infinite-scroll-component";
import {inject, observer} from "mobx-react";
import IUser from "../../Model/Interface/IUser";
import OrdersStore from "../../Store/OrdersStore";

type props = {
    user: IUser;
}

type injprops = {
    orderStore: OrdersStore;
} & props

@inject("orderStore")
@observer
class OrdersMenu extends React.Component<{ user: IUser }> {
    get injected(): injprops {
        return this.props as injprops;
    }

   async componentDidMount() {
      await this.injected.orderStore.GetOrder();
    }

    componentWillUnmount() {
    }

    render() {
        let {orderStore, user} = this.injected;
        console.log("i here")
        return (
            <div>
                <InfiniteScroll hasMore={orderStore.CanLoad}
                                loader={"загрузка....."}
                                next={() => orderStore.GetOrder()}
                                dataLength={orderStore.Orders.length}>
                    {orderStore.Orders.map(order => <OrderView key={order.id} order={order} user={user}/>)}
                </InfiniteScroll>
            </div>
        );
    }
}

export default OrdersMenu;