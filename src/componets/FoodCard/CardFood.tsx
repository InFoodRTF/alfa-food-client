import React from "react";
import {Button, Card} from "react-bootstrap";
import styles from "./CardFood.module.css";
import {observer} from "mobx-react";
import MealCategory from "../../Model/Enum/MealCategory";
import {Item} from "../../Pages/PagesParent/ProductMenu/ProductsMenu";

export interface IProduct {
    id: number
    name: string;
    price: number;
    description: string;
    grams: number;
    image: string;
    meal_category: MealCategory;
}
@observer
class CardFood extends React.Component<{item: Item, addToCart: (e: IProduct, ) => void}> {
    render() {
         return(
            <Card className={styles.foodCard}>
                <div className={styles.cardBlock}>
                    <div className={styles.infBlock}>
                        <Card.Img className={styles.imgForm} src={this.props.item.product.image}></Card.Img>
                        <Card.Title className={styles.costBlock}>{this.props.item.product.price} Руб</Card.Title>
                        <Card.Subtitle className={styles.foodName}>{this.props.item.product.name}</Card.Subtitle>
                    </div>
                    <div className={styles.gramBlock}><Card.Text className={styles.gramText}>{this.props.item.product.grams + " грамм"}</Card.Text></div>
                    <div className={styles.addInfBlock}>
                        <Button onClick={() => this.props.addToCart(this.props.item.product)} variant={''} bsPrefix={''} className={styles.cardButton}><p className={styles.text}>+</p><p className={styles.textAdd}>Добавить</p></Button>
                    </div>
                </div>
            </Card>
        )
    }
}
export default CardFood
