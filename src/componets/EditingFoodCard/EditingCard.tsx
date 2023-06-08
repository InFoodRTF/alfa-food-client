import React from "react";
import {Button, Card} from "react-bootstrap";
import styles from "./EditingCard.module.css";
import food from "./Img/Food.svg";
import edit from "./Img/Edit.svg";
import del from "./Img/Delete.svg";
import {IProduct} from "../FoodCard/CardFood";

interface props {
    product: IProduct
}

export class EditingCard extends React.Component<props> {
    render() {
        const {product} = this.props;
        return (
            <Card className={styles.foodCard}>
                <div className={styles.cardBlock}>
                    <div className={styles.infBlock}>
                        <Card.Img className={styles.imgForm} src={food}></Card.Img>
                        <div className={styles.countBlock}>
                            <Card.Title className={styles.costBlock}>{product.price} Руб</Card.Title>
                            <Card.Title className={styles.costBlock}>{product.grams} шт</Card.Title>
                        </div>
                        <Card.Subtitle className={styles.foodName}>Каша рисовая</Card.Subtitle>
                    </div>
                    <div className={styles.gramBlock}><Card.Text className={styles.gramText}>200г</Card.Text></div>
                    <div className={styles.addInfBlock}>
                        <Button variant={''} bsPrefix={''} className={styles.cardButton}>
                            <Card.Img className={styles.imgFormButtonEdit} src={edit}></Card.Img>
                        </Button>
                        <Button variant={''} bsPrefix={''} className={styles.cardButton}>
                            <Card.Img className={styles.imgFormButtonDel} src={del}></Card.Img>
                        </Button>
                    </div>
                </div>
            </Card>
        )
    }
}
