import React from "react";
import {Nav, Navbar, Image} from "react-bootstrap";
import styles from "./Navibar.module.css";
import exit from "./Img/r_m_exit.png";
import logo from "./Img/Mask group.png";
import {NavLink} from "react-router-dom";
import HttpPages from "../../Pages/HttpPages";


export const Navibar = () => {
    return (
        <Navbar collapseOnSelect expand={"lg"} className={styles.navbarCustom}>
                <Nav.Item className={styles.navBrand}>
                    <Navbar.Brand className={styles.brand}><Image src={logo}></Image></Navbar.Brand>
                    <p className={styles.textBrand}>Школьное Питание</p>
                </Nav.Item>
                <Nav.Item className={styles.navBlock}>
                    <Nav.Item className={styles.navItemFood}><Nav.Link bsPrefix={''} className={styles.navLinkFood}>Заказать питание</Nav.Link></Nav.Item>
                    <Nav.Item className={styles.navItemOrder}><NavLink to={HttpPages.Orders} className={styles.navLinkOrder}>Посмотреть заказы</NavLink></Nav.Item>
                </Nav.Item>
                <Nav.Item className={styles.navBlockRight}>
                    <Nav.Item className={styles.navItemProfile}><NavLink to={HttpPages.Profile}  className={styles.navLinkProfile}>Профиль</NavLink></Nav.Item>
                    <Nav.Item className={styles.navItemExit}><Nav.Link><Image src={exit}></Image></Nav.Link></Nav.Item>
                </Nav.Item>
        </Navbar>
    )
}
export default Navibar
