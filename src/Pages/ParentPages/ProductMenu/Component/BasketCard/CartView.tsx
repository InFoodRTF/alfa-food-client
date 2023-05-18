import React from "react";
import {Button, Card} from "react-bootstrap";
import styles from "./CardBasket.module.css";
import Product from "./Product";
import CartStore from "../../CartStore";
import {observer} from "mobx-react";
import {Item} from "../../ProductsMenu";
import mealCategory from "../../../../../Model/Enum/MealCategory";

export interface ICartInfo {
    cart_items: Item[]
}
@observer
export default class CartView extends React.Component<{cart: CartStore}>{
    render() {
        return(
            <Card className={styles.basCard}>
                <Card.Title style={{position: "absolute", top: "20px", left: "20px", marginBottom: "0", width: "224px", height: "24px"}}>
                    <p className={styles.cardTitle}>Корзина</p>
                </Card.Title>
                <div style={{display: "flex", flexDirection: "column", gap: "22px", marginTop:"54px"}}>
                    <div className={styles.mealCategory}>
                        <Card.Text className={styles.cardText}><p>Завтрак</p></Card.Text>
                        {this.props.cart.Products.filter(pro => pro.meal_category === mealCategory.breakfast).map(product =>
                            <Product key={product.id}
                                     productCount={this.props.cart.countItems[product.id]}
                                     product={product}
                                     put={e => this.props.cart.Put(e, true)}
                                     extract={e => this.props.cart.Extract(e)}/>)}
                    </div>
                    <div className={styles.mealCategory}>
                        <Card.Text className={styles.cardText}>Обед</Card.Text>
                        {this.props.cart.Products.filter(prod => prod.meal_category === mealCategory.lunch).map(product =>
                            <Product key={product.id}
                                     productCount={this.props.cart.countItems[product.id]}
                                     product={product}
                                     put={e => this.props.cart.Put(e, true)}
                                     extract={e => this.props.cart.Extract(e)}/>)}
                    </div>
                </div>
                <div style={{position: "absolute", bottom: "76px", left: "20px", display: "flex", flexDirection: "row", gap: "15px"}}>
                    <Card.Title className={styles.cardTitle} style={{width: "69px", marginBottom: "0px"}}>Итого:</Card.Title>
                    <Card.Title className={styles.cardTitle} style={{width: "140px", height: "24px", textAlign: "right", marginBottom: "0px"}}>{this.props.cart.sum}</Card.Title>
                </div>
                <div style={{position: "absolute", textAlign: "center", width: "264px", bottom: "19px"}}>
                    <Button variant={''} bsPrefix={''} className={styles.orderButton}><p className={styles.buttonText}>к оформлению</p></Button>
                </div>
            </Card>
        )
    }
}

// здесь херня с к оформлению она с МАЛЕНЬКОЙ БУКВЫ ибо с большой багггг