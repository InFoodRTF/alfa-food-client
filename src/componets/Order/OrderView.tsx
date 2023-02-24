import React from "react";
import Order from "../../Model/Order/Order";
import IUser from "../../Model/Interface/IUser";
import ItemOrder from "./ItemOrder";


class OrderView extends React.Component<{ order: Order, user: IUser }> {


    render() {
        return (
            <div className={"order"}>

                <h3>номер Заказа: {this.props.order.id}</h3>
                <h3>Дата: {this.props.order.date_ordered.toString()}</h3>
                <h3>Заказчик: {this.props.user.middle_name} {this.props.user.first_name[0]}. {this.props.user.last_name[0]}.</h3>
                <h3>ребенок: {this.props.order.student.middle_name} {this.props.order.student.first_name[0]}. {this.props.order.student.last_name[0]}</h3>
                <h3>Состав заказа:</h3>
                <p>
                    {this.props.order.order_items.map(product => <ItemOrder product={product}/>)}
                </p>

            </div>

        );
    }
}

export default OrderView;