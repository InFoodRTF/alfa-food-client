import React from "react";
import {Nav, Image, ModalFooter} from "react-bootstrap";
import styles from "./Footer.module.css";
import logo from "./Img/Maskgroup.png";
import urfu from "./Img/urfu.png";
import teamproject from "./Img/tp.png";


export class Footer extends React.Component{
    render() {
        return (
            <ModalFooter className={styles.footer}>
                <div className={styles.navbarCustom}>
                    <div className={styles.navBlockLeft}>
                        <div className={styles.navBrand}>
                            <div className={styles.brand}><Image src={logo}></Image></div>
                            <p className={styles.textBrand}>Школьное Питание</p>
                        </div>
                        <div className={styles.footerMainBlock}>
                            <div className={styles.navBlock}>
                                <Nav.Link className={styles.navItem}>Заказать питание</Nav.Link>
                                <Nav.Link className={styles.navItem}>Посмотреть заказы</Nav.Link>
                            </div>
                            <div className={styles.navBlock}>
                                <Nav.Link className={styles.navItem}>О нас</Nav.Link>
                                <Nav.Link className={styles.navItem}>Сообщить об ошибке</Nav.Link>
                            </div>
                        </div>
                    </div>
                    <div className={styles.navBlockRight}>
                        <div className={styles.navItemProfile}><Image src={urfu}></Image></div>
                        <div className={styles.navItemExit}><Image src={teamproject}></Image></div>
                    </div>
                </div>
            </ModalFooter>
        )
    }
}
