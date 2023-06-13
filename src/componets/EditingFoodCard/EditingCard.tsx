import React from "react";
import {Button, Card} from "react-bootstrap";
import styles from "./EditingCard.module.css";
import edit from "./Img/Edit.svg";
import del from "./Img/Delete.svg";
import {Item} from "../../Pages/PagesParent/ProductMenu/ProductsMenu";

interface props {
    item: Item
}

export class EditingCard extends React.Component<props> {
    render() {
        const {item} = this.props;
        return (
            <Card className={styles.foodCard}>
                <div className={styles.cardBlock}>
                    <div className={styles.infBlock}>
                        <Card.Img className={styles.imgForm} src={item.product.image}></Card.Img>
                        <div className={styles.countBlock}>
                            <Card.Title className={styles.costBlock}>{item.product.price} Руб</Card.Title>
                            <Card.Title style={{position: "relative", left: "3px"}} className={styles.costBlock}>{item.quantity} шт</Card.Title>
                        </div>
                        <Card.Subtitle className={styles.foodName}>{item.product.name}</Card.Subtitle>
                    </div>
                    <div className={styles.gramBlock}><Card.Text className={styles.gramText}>{item.product.grams}г</Card.Text></div>
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
