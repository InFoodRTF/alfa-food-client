import React from "react";
interface OrderItem {
    id: number;
    quantity: number;
    data_added: Date;
    meal_category: string;
    product_name: string;
    price: number;
}

export default OrderItem;