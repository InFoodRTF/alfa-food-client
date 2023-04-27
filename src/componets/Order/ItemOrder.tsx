import React from "react";
import OrderItem from "../../Model/Order/OrderItem";

class ItemOrder extends React.Component<{product: OrderItem}> {

    render() {
        return (
            <div>
                <p> {this.props.product.product_name} {this.props.product.quantity} шт {this.props.product.price} руб</p>
            </div>
        );
    }
}

export default ItemOrder