import React from "react";
import OrderView from "../../../componets/Order/OrderView";
import InfiniteScroll from "react-infinite-scroll-component";
import {inject, observer} from "mobx-react";
import OrdersStore from "./OrdersStore";
import IParent from "../../../Model/Interface/IParent";
import {OrderHistoryCard} from "./component/OrderCard/OrderCard";


type props = {
    orderStore: OrdersStore;
    user: IParent;
}


@inject("orderStore")
@observer
class OrdersMenu extends React.Component<{ user: IParent }> {
    get injected(): props {
        return this.props as props;
    }

    async componentDidMount() {
        await this.injected.orderStore.Loader.LoadData();
    }

    componentWillUnmount() {
    }

    render() {
        let {orderStore} = this.injected;
        return (
            <div>
                <InfiniteScroll hasMore={orderStore.Loader.LoadMore}
                                loader={"загрузка....."}
                                next={() => orderStore.Loader.LoadData()}
                                dataLength={orderStore.Loader.List.length}>
                    {orderStore.Loader.List.map(order => <OrderView key={order.id} order={order}
                                                                    user={this.props.user}/>)}
                </InfiniteScroll>
                <OrderHistoryCard/>
            </div>
        );
    }
}

export default OrdersMenu;