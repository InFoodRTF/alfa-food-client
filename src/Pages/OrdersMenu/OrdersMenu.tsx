import React from "react";
import OrderView from "../../componets/Order/Order";
import InfiniteScroll from "react-infinite-scroll-component";
import {inject, observer} from "mobx-react";
import OrdersStore from "../../Store/OrdersStore";
import UserStore from "../../Store/UserStore";
import Header from "../../componets/Header";



type injprops = {
    orderStore: OrdersStore;
    userStore: UserStore;
}

@inject("orderStore", "userStore")
@observer
class OrdersMenu extends React.Component {
    get injected(): injprops {
        return this.props as injprops;
    }

   async componentDidMount() {
      await this.injected.orderStore.GetOrder();
    }

    componentWillUnmount() {
    }

    render() {
        let {orderStore, userStore} = this.injected;
        console.log("i here")
        return (
            <div>
                <Header/>
                <InfiniteScroll hasMore={orderStore.CanLoad}
                                loader={"загрузка....."}
                                next={() => orderStore.GetOrder()}
                                dataLength={orderStore.Orders.length}>
                    {orderStore.Orders.map(order => <OrderView key={order.id} order={order} user={userStore.User}/>)}
                </InfiniteScroll>
            </div>
        );
    }
}

export default OrdersMenu;