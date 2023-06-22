import React from "react";
import {Button, Card} from "react-bootstrap";
import styles from "./CardBasket.module.css";
import ProductView from "./ProductView";
import CartStore from "../../CartStore";
import {observer} from "mobx-react";
import {Item} from "../../ProductsMenu";
import ModalView from "../../../../../componets/ModalView/ModalConfirmChange";

export interface ICartInfo {
    cart_items: Item[]
}

@observer
export default class CartView extends React.Component<{ cart: CartStore }, { create: boolean }> {
    constructor(props: { cart: CartStore }) {
        super(props);

        this.state = {create: false}
    }

    render() {
        return (
            <Card className={styles.basCard}>
                <Card.Title style={{
                    position: "absolute",
                    top: "20px",
                    left: "20px",
                    marginBottom: "0",
                    width: "224px",
                    height: "24px"
                }}>
                    <p className={styles.cardTitle}>Корзина</p>
                </Card.Title>
                <div style={{display: "flex", flexDirection: "column", gap: "22px", marginTop: "54px"}}>
                    <div className={styles.mealCategory}>
                        <Card.Text className={styles.cardText}><p>Завтрак</p></Card.Text>
                        {this.props.cart.ShowSelectedCategoryProduct.map(Items => Items.map(item =>
                            <ProductView key={item.id}
                                         item={item}
                                         put={e => this.props.cart.Add(e, true)}
                                         extract={e => this.props.cart.remove(e)}/>))}

                    </div>
                </div>
                <div style={{
                    position: "absolute",
                    bottom: "76px",
                    left: "20px",
                    display: "flex",
                    flexDirection: "row",
                    gap: "15px"
                }}>
                    <Card.Title className={styles.cardTitle}
                                style={{width: "69px", marginBottom: "0px"}}>Итого:</Card.Title>
                    <Card.Title className={styles.cardTitle} style={{
                        width: "140px",
                        height: "24px",
                        textAlign: "right",
                        marginBottom: "0px"
                    }}>{this.props.cart.sum}</Card.Title>
                </div>
                <div style={{position: "absolute", textAlign: "center", width: "264px", bottom: "19px"}}>
                    <Button onClick={() => {
                        this.props.cart.CreateOrder();
                        this.setState({create: true})
                    }} variant={''} bsPrefix={''} className={styles.orderButton}><p
                        className={styles.buttonText}>Оформить</p></Button>
                </div>
                <ModalView textClose={"ок"} active={this.state.create} onClose={() => {
                    this.setState({create: false})
                    this.props.cart.ItemsClear();
                }}><span> Заказ сделал</span></ModalView>
            </Card>
        )
    }
}

// здесь херня с к оформлению она с МАЛЕНЬКОЙ БУКВЫ ибо с большой багггг