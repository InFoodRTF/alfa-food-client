import React from "react";
import OrderView from "../../componets/Order/OrderView";
import InfiniteScroll from "react-infinite-scroll-component";
import {inject, observer} from "mobx-react";
import OrdersStore from "../../Store/OrdersStore";
import UserStore from "../../Store/UserStore";
import Header from "../../componets/Header/Header";


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
        await this.injected.userStore.AuthByToken();
    }

    componentWillUnmount() {
    }

    render() {
        let {orderStore, userStore} = this.injected;
        console.log("i here")
        return (
            <div>
                <Header/>
                <InfiniteScroll hasMore={orderStore.Loader.LoadMore}
                                loader={"загрузка....."}
                                next={() => orderStore.Loader.LoadData()}
                                dataLength={orderStore.Loader.List.length}>
                    {orderStore.Loader.List.map(order => <OrderView key={order.id} order={order} user={userStore.User}/>)}
                </InfiniteScroll>
                <button onClick={() => userStore.GetStudents() }>{}</button>
                {userStore.Students.map(st => <p>{st.last_name} {st.middle_name} </p>)}
            </div>
        );
    }
}

export default OrdersMenu;