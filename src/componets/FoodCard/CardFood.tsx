import React from "react";
import {Button, Card} from "react-bootstrap";
import styles from "./CardFood.module.css";
import mealCategory from "../../Model/Enum/MealCategory";
import {observer} from "mobx-react";

export interface IProduct {
    id: number
    name: string;
    price: number;
    description: string;
    grams: number;
    image: string;
    meal_category: mealCategory;
}
@observer
class CardFood extends React.Component<{product: IProduct, addToBasket: (e: IProduct) => void}> {
    render() {
         return(
            <Card className={styles.foodCard}>
                <div className={styles.cardBlock}>
                    <div className={styles.infBlock}>
                        <Card.Img className={styles.imgForm} src={this.props.product.image}></Card.Img>
                        <Card.Title className={styles.costBlock}>{this.props.product.price}</Card.Title>
                        <Card.Subtitle className={styles.foodName}>{this.props.product.name}</Card.Subtitle>
                    </div>
                    <div className={styles.gramBlock}><Card.Text className={styles.gramText}>{this.props.product.grams + " грамм"}</Card.Text></div>
                    <div className={styles.addInfBlock}>
                        <Button onClick={() => this.props.addToBasket(this.props.product)} variant={''} bsPrefix={''} className={styles.cardButton}><p className={styles.text}>+</p><p className={styles.textAdd}>Добавить</p></Button>
                    </div>
                </div>
            </Card>
        )
    }
}
export default CardFood
