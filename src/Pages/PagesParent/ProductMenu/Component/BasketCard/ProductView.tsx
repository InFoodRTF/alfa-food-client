import React from "react";
import {Button, Card} from "react-bootstrap";
import styles from "./Food.module.css";
import {observer} from "mobx-react";
import {Item} from "../../ProductsMenu";

@observer
export class ProductView extends React.Component<{ // this.props.productCount для чего это !!!)((!)
    item: Item,
    put: (e: Item) => void,
    extract: (e: Item) => void
}> {
    render() {
        return (
            <div className={styles.food}>
                <Card.Subtitle className={styles.cardFood}><p>{this.props.item.product.name}</p></Card.Subtitle>
                <div style={{
                    width: "55px",
                    height: "10px",
                    display: "flex",
                    flexDirection: "row",
                    gap: "9px",
                    alignItems: "center"
                }}>
                    <Button variant={''} bsPrefix={''} className={styles.addFood}
                            style={{padding: "0px", alignItems: "center"}}>
                        <p onClick={() => this.props.extract(this.props.item)} className={styles.smallButton}>-</p>
                    </Button>
                    <p className={styles.addFood}
                       style={{width: "5px", height: "11px", marginBottom: "0px"}}>{this.props.item.quantity}</p>
                    <Button onClick={() => this.props.item.quantity} variant={''} bsPrefix={''}
                            className={styles.addFood} style={{padding: "0px", margin: "0px"}}>
                        <p onClick={() => this.props.put(this.props.item)} className={styles.smallButton}>+</p>
                    </Button>
                </div>
                <p className={styles.price} style={{marginBottom: "0px"}}>{this.props.item.product.price}руб</p>
            </div>
        );
    }
}

export default ProductView
