import React from "react";
import Product from "./Product";

class OrderItem {
    quantity: number = 0;
    data_added: Date = new Date();
    product: Product = new Product();
}

export default OrderItem;