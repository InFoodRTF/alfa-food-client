import React from "react";
import IParent from "../../../Model/Interface/IParent";
import InfiniteScroll from "react-infinite-scroll-component";
import {inject, observer} from "mobx-react";
import OrdersStore from "../../../Store/OrdersStore";
import "./ParentMenuStyles.css"
import OrderView from "../../../componets/Order/Order";

type props = {
    user: IParent;
}

type injprops = {
    orderStore: OrdersStore;
} & props


@inject("orderStore")
@observer
class ParentMenu extends React.Component<{ user: IParent }, any> {
    get injected(): injprops {
        return this.props as injprops;
    }

    componentDidMount() {
        this.injected.orderStore.GetOrder();
    }

    componentWillUnmount() {
    }

    render() {
        let {orderStore, user} = this.injected;
        console.log(user.balance)
        console.log("это меню родителя")
        return (
            <div>
                <InfiniteScroll hasMore={true}
                                loader={"загрузка....."}
                                next={() => orderStore.GetOrder()}
                                dataLength={orderStore.Orders.length}>
                    {orderStore.Orders.map(order => <OrderView key={order.id} order={order} user={user}/>)}
                </InfiniteScroll>
            </div>
        );
    }
}

export default ParentMenu;