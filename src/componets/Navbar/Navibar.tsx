import styles from "./Navibar.module.css";
import React from "react";
import logo from "./Img/Mask group.png";
import exit from "./Img/r_m_exit.png";
import {Image, Nav, Navbar} from "react-bootstrap";
import {Link, Navigate} from "react-router-dom";
import httpPages from "../../Pages/HttpPages";
import AuthKey from "../../Model/AuthKey";


// todo ух ух ух, это все бы в один метод)))))
const orderMeals = () => {
    const order = document.getElementById('order')
    const watch = document.getElementById('watch')
    const report = document.getElementById('report')
    if (order !== null && watch !== null && report !== null && (watch.classList.contains(styles.red) || report.classList.contains(styles.red))) {
        order.classList.toggle(styles.red)
        if (watch.classList.contains(styles.red)) {
            watch.classList.remove(styles.red)
        }
        if (report.classList.contains(styles.red)) {
            report.classList.remove(styles.red)
        }
    }
    else
        orderMeals2()
}

const orderWatch = () => {
    const order = document.getElementById('order')
    const watch = document.getElementById('watch')
    const report = document.getElementById('report')
    if (order !== null && watch !== null && report !== null && (order.classList.contains(styles.red) || report.classList.contains(styles.red))) {
        watch.classList.toggle(styles.red)
        if (order.classList.contains(styles.red)) {
            order.classList.remove(styles.red)
        }
        if (report.classList.contains(styles.red)) {
            report.classList.remove(styles.red)
        }
    }
    else
        orderWatch2()
}

const orderMeals2 = () => {
    const order = document.getElementById('order')
    const watch = document.getElementById('watch')
    if (order !== null && watch !== null && watch.classList.contains(styles.red)) {
        order.classList.toggle(styles.red)
        watch.classList.remove(styles.red)
    }
}

const orderWatch2 = () => {
    const order = document.getElementById('order')
    const watch = document.getElementById('watch')
    if (order !== null && watch !== null && order.classList.contains(styles.red)) {
        order.classList.remove(styles.red)
        watch.classList.toggle(styles.red)
    }
}
const orderReport = () => {
    const order = document.getElementById('order')
    const watch = document.getElementById('watch')
    const report = document.getElementById('report')
    if (order !== null && watch !== null && report !== null && (order.classList.contains(styles.red) || watch.classList.contains(styles.red))) {
        report.classList.toggle(styles.red)
        if (watch.classList.contains(styles.red)) {
            watch.classList.remove(styles.red)
        }
        if (order.classList.contains(styles.red)) {
            order.classList.remove(styles.red)
        }
    }
}


interface buttonLink {
    name: string;
    link: string;
}
export class Navibar extends React.Component<{ LeftButton: buttonLink, SecondButton: buttonLink, thirdButton?: buttonLink  }> {

    componentDidMount() {
        if (window.location.pathname === httpPages.Orders)
            orderWatch();
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
                            <Nav.Link as={Link} to={this.props.LeftButton.link} className={[styles.navItem, styles.red].join(' ')} id={'order'} onClick={orderMeals}>{this.props.LeftButton.name}</Nav.Link>
                            <Nav.Link as={Link} to={this.props.SecondButton.link} className={styles.navItem} id={'watch'} onClick={orderWatch}>{this.props.SecondButton.name}</Nav.Link>
                            {this.props.thirdButton !== undefined && <Nav.Link as={Link} to={this.props.thirdButton.link} className={styles.navItem} id={'report'}
                                       onClick={orderReport}>{this.props.thirdButton.name}</Nav.Link>}
                        </Nav.Item>
                    </Nav.Item>
                    <Nav.Item className={styles.navBlockRight}>
                        <Nav.Link as={Link} to={httpPages.Profile} className={styles.navItemProfile}>Профиль</Nav.Link>
                        <Nav.Link as={Link} to={httpPages.Login} onClick={() => {
                            this.RemoveToken()
                        }} className={styles.navItemExit}><Image
                            src={exit}></Image></Nav.Link>
                    </Nav.Item>
                </Nav.Item>
            </Navbar>
        )
    }
}