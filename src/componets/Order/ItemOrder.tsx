import React from "react";
import OrderItem from "../../Model/Order/OrderItem";

class ItemOrder extends React.Component<{product: OrderItem}>{

    render() {
        return (
            <div>
                <img style={{height:"10vh", paddingRight:"3vh"}} src={this.props.product.product.image}/>
                <p> {this.props.product.product.name} {this.props.product.quantity} шт {this.props.product.product.price} руб</p>
            </div>
        );
    }
}

export default ItemOrder