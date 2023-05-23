import styles from "./Navibar.module.css";
import React from "react";
import logo from "./Img/Mask group.png";
import exit from "./Img/r_m_exit.png";
import {Image, Nav, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";
import httpPages from "../../Pages/HttpPages";
import AuthKey from "../../Model/AuthKey";


// вообще это мы переместить в сторе, но аха, мне лень, поэтому будет так
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

interface buttonLink {
    name: string;
    link: string;
}
export class Navibar extends React.Component<{ LeftButton: buttonLink, rightButton: buttonLink }> {

    componentDidMount() {
        if (window.location.pathname === httpPages.Orders)
            orderCheck();
    }

    // todo это нужно будет вынести за пределы странички
    RemoveToken() {
        AuthKey.Remove();
    }
    render() {

        return (
            <Navbar className={styles.nav}>
                <Nav.Item className={styles.navbarCustom}>
                    <Nav.Item className={styles.navBlockLeft}>
                        <Nav.Item className={styles.navBrand}>
                            <Navbar.Brand className={styles.brand}><Image src={logo}></Image></Navbar.Brand>
                            <p className={styles.textBrand}>Школьное Питание</p>
                        </Nav.Item>
                        <Nav.Item className={styles.navBlock}>
                            <Nav.Link as={Link} to={this.props.LeftButton.link} className={[styles.navItem, styles.red].join(' ')} id={'order'} onClick={TakeProducts}>{this.props.LeftButton.name}</Nav.Link>
                            <Nav.Link as={Link} to={this.props.rightButton.link} className={styles.navItem} id={'watch'} onClick={orderCheck}>{this.props.rightButton.name}</Nav.Link>
                        </Nav.Item>
                    </Nav.Item>
                    <Nav.Item className={styles.navBlockRight}>
                        <Nav.Link as={Link} to={httpPages.Profile} className={styles.navItemProfile}>Профиль</Nav.Link>
                        <Nav.Link as={Link} to={httpPages.Login} onClick={() => this.RemoveToken()} className={styles.navItemExit}><Image
                            src={exit}></Image></Nav.Link>
                    </Nav.Item>
                </Nav.Item>
            </Navbar>
        )
    }
}