import styles from "./Navibar.module.css";
import React from "react";
import logo from "./Img/Mask group.png";
import exit from "./Img/r_m_exit.png";
import {Image, Nav, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";
import httpPages from "../../Pages/HttpPages";
export class Navibar extends React.Component{
    render() {
        const TakeProducts = () => {
            const order = document.getElementById('order')
            const watch = document.getElementById('watch')
            if (order !== null && watch !== null && watch.classList.contains(styles.red)) {
                order.classList.toggle(styles.red)
                watch.classList.remove(styles.red)
            }

        }

        const orderCheck = () => {
            const order = document.getElementById('order')
            const watch = document.getElementById('watch')
            if (order !== null && watch !== null && order.classList.contains(styles.red)) {
                order.classList.remove(styles.red)
                watch.classList.toggle(styles.red)
            }
        }

        return (
            <Navbar className={styles.nav}>
                <Nav.Item className={styles.navbarCustom}>
                    <Nav.Item className={styles.navBlockLeft}>
                        <Nav.Item className={styles.navBrand}>
                            <Navbar.Brand className={styles.brand}><Image src={logo}></Image></Navbar.Brand>
                            <p className={styles.textBrand}>Школьное Питание</p>
                        </Nav.Item>
                        <Nav.Item className={styles.navBlock}>
                            <Nav.Link as={Link} to={httpPages.Products} className={[styles.navItem, styles.red].join(' ')} id={'order'} onClick={TakeProducts}>Заказать питание</Nav.Link>
                            <Nav.Link as={Link} to={httpPages.Orders} className={styles.navItem} id={'watch'} onClick={orderCheck}>Посмотреть заказы</Nav.Link>
                        </Nav.Item>
                    </Nav.Item>
                    <Nav.Item className={styles.navBlockRight}>
                        <Nav.Link as={Link} to={httpPages.Profile} className={styles.navItemProfile}>Профиль</Nav.Link>
                        <Nav.Link as={Link} to={httpPages.Auth} className={styles.navItemExit}><Image src={exit}></Image></Nav.Link>
                    </Nav.Item>
                </Nav.Item>
            </Navbar>
        )
    }
}