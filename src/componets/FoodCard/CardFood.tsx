import React from "react";
import {Button, Card} from "react-bootstrap";
import styles from "./CardFood.module.css";
import IFoodMainInfo from "../../Model/Interface/IFoodMainInfo";

class CardFood extends React.Component<{food: IFoodMainInfo}> {
    render() {
         return(
            <Card className={styles.foodCard}>
                <div className={styles.cardBlock}>
                    <div className={styles.infBlock}>
                        <Card.Img className={styles.imgForm} src={this.props.food.image}></Card.Img>
                        <Card.Title className={styles.costBlock}>{this.props.food.price}</Card.Title>
                        <Card.Subtitle className={styles.foodName}>{this.props.food.name}</Card.Subtitle>
                    </div>
                    <div className={styles.gramBlock}><Card.Text className={styles.gramText}>{this.props.food.grams + " грамм"}</Card.Text></div>
                    <div className={styles.addInfBlock}>
                        <Button variant={''} bsPrefix={''} className={styles.cardButton}><p className={styles.text}>+</p><p className={styles.textAdd}>Добавить</p></Button>
                    </div>
                </div>
            </Card>
        )
    }
}
export default CardFood
