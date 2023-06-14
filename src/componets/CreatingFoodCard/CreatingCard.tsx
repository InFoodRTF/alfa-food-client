import React from "react";
import {Button, Card} from "react-bootstrap";
import styles from "./CreatingCard.module.css";
import addImage from "./NewFood.svg";


export class CreatingCard extends React.Component<{onClick: () => void}>{
    render() {
        return (
            <Card className={styles.foodCard}>
                <div className={styles.cardBlock}>
                    <div className={styles.infBlock}>
                        <Card.Img className={styles.imgForm} src={addImage}></Card.Img>
                    </div>
                    <div className={styles.gramBlock}>
                        <Button onClick={this.props.onClick} variant={''} bsPrefix={''} className={styles.cardButton}>
                            <p className={styles.textAdd}>Добавить блюдо</p>
                        </Button>
                    </div>
                </div>
            </Card>
        );
    }
}

