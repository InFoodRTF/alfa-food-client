import React from "react";
import {Button, Card} from "react-bootstrap";
import styles from "./EditingCard.module.css";
import del from "./Img/Delete.svg";
import {observer} from "mobx-react";
import {Item} from "../../Lib/BaseItemStore";

interface props {
    item: Item
    onCLickMinus: () => void,
    onCLickPlus: () => void,
}

@observer
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
                            <p style={{fontSize: "30px", position: "relative", top: "6px"}} onClick={() => this.props.onCLickPlus()} className={styles.smallButton}>+</p>
                        </Button>
                        <Button variant={''} bsPrefix={''} className={styles.cardButton}>
                            <p style={{fontSize: "30px", position: "relative", top: "6px"}} onClick={() => this.props.onCLickMinus()} className={styles.smallButton}>-</p>
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
