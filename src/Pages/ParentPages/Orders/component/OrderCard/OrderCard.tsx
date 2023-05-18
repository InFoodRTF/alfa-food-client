import React from "react";
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import styles from "./OrderHistoryCard.module.css"

export class OrderHistoryCard extends React.Component {
    render() {
        return (
            <Container className={styles.OrderHistoryContainer}>
                <Card className={styles.OrderHistoryCard}>
                    <Card.Body>
                        <Card.Title className={styles.Title}>Заказ №12337485683568356</Card.Title>
                        <Card.Text><h4 className={styles.Subtitle}>Дата:</h4><p
                            className={styles.DescriptionText}>30.01.2023</p></Card.Text>
                        <Card.Text><h4 className={styles.Subtitle}>Заказчик: </h4><p
                            className={styles.DescriptionText}>Иванов П. И. </p></Card.Text>
                        <Card.Text><h4 className={styles.Subtitle}>Ребенок: </h4><p
                            className={styles.DescriptionText}>Иванов И. П. 10 “А” класс</p></Card.Text>
                        <Card.Text><h4 className={styles.Subtitle}>Состав заказа: </h4></Card.Text>
                        <Card.Text>
                            <h4 className={styles.Subtitle}>Завтрак: </h4>
                            <div className={styles.CardText}>
                                <p className={styles.FoodItem}>Каша овсяная</p>
                                <p className={styles.FoodItemCount}>1шт</p>
                                <p className={styles.FoodItemPrice}>50 ₽</p>
                            </div>
                            <div className={styles.CardText}>
                                <p className={styles.FoodItem}>Бутерброд</p>
                                <p className={styles.FoodItemCount}>1шт</p>
                                <p className={styles.FoodItemPrice}>30 ₽</p>
                            </div>
                            <div className={styles.CardText}>
                                <p className={styles.FoodItem}>Чай черный</p>
                                <p className={styles.FoodItemCount}>1шт</p>
                                <p className={styles.FoodItemPrice}>15 ₽</p>
                            </div>
                        </Card.Text>
                        <Card.Text>
                            <h4 className={styles.Subtitle}>Обед: </h4>
                            <div className={styles.CardText}>
                                <p className={styles.FoodItem}>Каша овсяная</p>
                                <p className={styles.FoodItemCount}>1шт</p>
                                <p className={styles.FoodItemPrice}>50 ₽</p>
                            </div>

                            <div className={styles.CardText}>
                                <p className={styles.FoodItem}>Бутерброд</p>
                                <p className={styles.FoodItemCount}>1шт</p>
                                <p className={styles.FoodItemPrice}>15 ₽</p>
                            </div>

                        </Card.Text>

                        <Card.Text>
                            <h4 className={styles.Subtitle}>Итого: 195 ₽</h4>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Container>
        )
    }
}