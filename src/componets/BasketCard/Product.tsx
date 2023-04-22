import React from "react";
import {Button, Card} from "react-bootstrap";
import styles from "./Food.module.css";
import {IProduct} from "../FoodCard/CardFood";
import {observer} from "mobx-react";

@observer
export class Product extends React.Component<{
    product: IProduct,
    productCount: number,
    put: (e: IProduct) => void,
    extract: (e: IProduct) => void}> {
    render() {
        return (
            <div className={styles.food}>
                <Card.Subtitle className={styles.cardFood}><p>{this.props.product.name}</p></Card.Subtitle>
                <div style={{width: "55px", height: "10px", display: "flex", flexDirection: "row", gap: "9px", alignItems: "center"}}>
                    <Button variant={''} bsPrefix={''} className={styles.addFood} style={{padding: "0px", alignItems: "center"}}>
                        <p onClick={() => this.props.extract(this.props.product)} className={styles.smallButton}>-</p>
                    </Button>
                    <p className={styles.addFood} style={{width: "5px", height: "11px", marginBottom: "0px"}}>{this.props.productCount}</p>
                    <Button onClick={() => this.props.productCount}  variant={''} bsPrefix={''} className={styles.addFood} style={{padding: "0px", margin: "0px"}}>
                        <p onClick={() => this.props.put(this.props.product)} className={styles.smallButton}>+</p>
                    </Button>
                </div>
                <p className={styles.price} style={{marginBottom: "0px"}}>{this.props.product.price}руб</p>
            </div>
        );
    }
}
export default Product
