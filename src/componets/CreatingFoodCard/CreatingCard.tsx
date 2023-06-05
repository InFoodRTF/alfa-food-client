import React from "react";
import {Button, Card} from "react-bootstrap";
import styles from "./CreatingCard.module.css";
import addImage from "./NewFood.svg";


export class CreatingCard extends React.Component{
    render() {
        return(
            <Card className={styles.foodCard}>
                <div className={styles.cardBlock}>
                    <div className={styles.infBlock}>
                        <Card.Img className={styles.imgForm} src={addImage}></Card.Img>
                    </div>
                    <div className={styles.gramBlock}>
                        <Button variant={''} bsPrefix={''} className={styles.cardButton}>
                            <p className={styles.textAdd}>Новое блюдо</p>
                        </Button>
                    </div>
                </div>
            </Card>
        )
    }
}

