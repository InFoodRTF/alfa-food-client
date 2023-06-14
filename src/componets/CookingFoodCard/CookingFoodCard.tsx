import React from "react";
import styles from "./CookingFoodCard.module.css";
import {Card} from "react-bootstrap";
import food from "./Img/Food.svg";
import plus from "./Img/Plus.svg";
import {IProduct} from "../FoodCard/CardFood";

interface props {
    product: IProduct;
    onClick: () => void;
}
export class CookingFoodCard extends React.Component<props>{
    render() {
        const {product} = this.props;
        return(
            <Card className={styles.foodCardMenu}>
                <div className={styles.cardBlockMenu}>
                    <div className={styles.foodInfMenu}>
                        <div className={styles.imgBlockMenu}>
                            <img src={food} alt={""}/>
                        </div>
                        <div className={styles.infBlockMenu}>
                                <p className={styles.textMenu}>{product.name}</p>
                                <p className={styles.priceMenu}>{product.price} рублей</p>
                        </div>
                    </div>
                    <button onClick={this.props.onClick} className={styles.addButtonMenu}><img src={plus} alt={""}/></button>
                </div>
            </Card>
        )
    }
}
