import React from "react";
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import styles from "./OrderHistoryCard.module.css"
import OrderItem from "../../../../../Model/Order/OrderItem";
import MealCategory from "../../../../../Model/Enum/MealCategory";
import {IStudent} from "../../../../Store/IStudent";
import {getInitials} from "../../../../../Lib/Transormators";
import IUser from "../../../../../Model/Interface/IUser";
import orderItem from "../../../../../Model/Order/OrderItem";


export interface Order {
    id: number;
    order_items: OrderItem[];
    order_date: Date;
    date_ordered: Date;
    student: IStudent;
}


class ItemInfo extends React.Component<{ orderItem: OrderItem }> {
    render() {
        return <div className={styles.CardText}>
            <p className={styles.FoodItem}>{this.props.orderItem.product_name}</p>
            <p className={styles.FoodItemCount}>{this.props.orderItem.quantity}шт</p>
            <p className={styles.FoodItemPrice}>{this.props.orderItem.price} ₽</p>
        </div>;
    }
}

// Todo рефакторнуть код. много повторений да и вообще сделать его рабочим))
export class OrderHistoryCard extends React.Component<{ order: Order, user: IUser }> {

    render() {
        let {order, user} = this.props;
        return (
            <Container className={styles.OrderHistoryContainer}>
                <Card className={styles.OrderHistoryCard}>
                    <Card.Body>
                        <Card.Title className={styles.Title}>Заказ №{order.id}</Card.Title>
                        <Card.Text><h4 className={styles.Subtitle}>Дата:</h4><p
                            className={styles.DescriptionText}>{order.date_ordered.toLocaleString()}</p></Card.Text>
                        <Card.Text><h4 className={styles.Subtitle}>Заказчик: </h4><p
                            className={styles.DescriptionText}>{getInitials(user)}. </p></Card.Text>
                        <Card.Text><h4 className={styles.Subtitle}>Ребенок: </h4><p
                            className={styles.DescriptionText}>{getInitials(order.student)} {order.student.grade} класс</p>
                        </Card.Text>
                        <Card.Text><h4 className={styles.Subtitle}>Состав заказа: </h4></Card.Text>
                        <Card.Text>
                            <h4 className={styles.Subtitle}>Завтрак: </h4>
                            {order.order_items.filter(x => x.meal_category === "Завтрак").map(item => <ItemInfo orderItem={item}/>)}
                        </Card.Text>
                        <Card.Text>
                            <h4 className={styles.Subtitle}>Обед: </h4>
                            {order.order_items.filter(x => x.meal_category === "Обед").map(item => <ItemInfo orderItem={item}/>)}
                        </Card.Text>

                        <Card.Text>
                            <h4 className={styles.Subtitle}>Итого: {order.order_items.map(x => x.quantity * x.price).reduce((x,y) => x + y)} ₽</h4>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Container>
        )
    }
}