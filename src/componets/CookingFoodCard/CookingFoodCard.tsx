import React from "react";
import styles from "./CookingFoodCard.module.css";
import {Card} from "react-bootstrap";
import plus from "./Img/Plus.svg";
import {IProduct} from "../../Lib/BaseItemStore";

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
                            <img width="150" height="110" style={{borderRadius: "15px"}} src={product.image} alt={""}/>
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
