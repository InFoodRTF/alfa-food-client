import React from "react";
import OrderView from "../../../componets/Order/OrderView";
import InfiniteScroll from "react-infinite-scroll-component";
import {inject, observer} from "mobx-react";
import OrdersStore from "./OrdersStore";
import UserStore from "../UserStore";
import Navibar from "../../../componets/Navbar/Navibar";


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
        await this.injected.orderStore.Loader.LoadData();
        await this.injected.userStore.AuthByToken();        // поменять местами, а то кринж
    }

    componentWillUnmount() {
    }

    render() {
        let {orderStore, userStore} = this.injected;
        return (
            <div>
                <Navibar/>
                <InfiniteScroll hasMore={orderStore.Loader.LoadMore}
                                loader={"загрузка....."}
                                next={() => orderStore.Loader.LoadData()}
                                dataLength={orderStore.Loader.List.length}>
                    {orderStore.Loader.List.map(order => <OrderView key={order.id} order={order} user={userStore.User}/>)}
                </InfiniteScroll>
            </div>
        );
    }
}

export default OrdersMenu;