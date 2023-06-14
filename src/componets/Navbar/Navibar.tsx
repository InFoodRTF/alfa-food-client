import styles from "./Navibar.module.css";
import React from "react";
import logo from "./Img/Mask group.png";
import exit from "./Img/r_m_exit.png";
import {Image, Nav, Navbar} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import httpPages from "../../Pages/PagesPath";
import AuthKey from "../../Model/AuthKey";
import {observer} from "mobx-react";



interface buttonLink {
    name: string;
    link: string;
}

interface props {
    LeftButton: buttonLink,
    SecondButton: buttonLink,
    thirdButton?: buttonLink
}
@observer
export class Navibar extends React.Component<props,{curUrl: string}> {

    constructor(props: props) {
        super(props);
        this.state = {curUrl: ""}
    }
    componentDidMount() {
        console.log(httpPages.Products, this.props.LeftButton.link)
        this.setState({curUrl: window.location.pathname})
    }

    // todo это нужно будет вынести за пределы странички
    RemoveToken() {
        AuthKey.Remove();
    }
    render() {
        const {LeftButton, SecondButton, thirdButton} = this.props;
        return (
            <Navbar className={styles.nav}>
                <Nav.Item className={styles.navbarCustom}>
                    <Nav.Item className={styles.navBlockLeft}>
                        <Nav.Item className={styles.navBrand}>
                            <Navbar.Brand className={styles.brand}><Image src={logo}></Image></Navbar.Brand>
                            <p className={styles.textBrand}>Школьное Питание</p>
                        </Nav.Item>
                        <Nav.Item className={styles.navBlock}>
                            <Nav.Link as={Link} to={this.props.LeftButton.link} onClick={() => this.setState({curUrl: LeftButton.link})} className={`${styles.navItem} ${this.state.curUrl === LeftButton.link ? styles.red : ''}`} id={'order'}>{this.props.LeftButton.name}</Nav.Link>
                            <Nav.Link as={Link} to={this.props.SecondButton.link} onClick={() => this.setState({curUrl: SecondButton.link})} className={`${styles.navItem} ${this.state.curUrl === SecondButton.link ? styles.red : ''}`} id={'watch'} >{this.props.SecondButton.name}</Nav.Link>
                            {thirdButton !== undefined && <Nav.Link as={Link} onClick={() => this.setState({curUrl: thirdButton?.link ?? ''})} to={thirdButton.link} className={`${styles.navItem} ${this.state.curUrl === thirdButton.link ? styles.red : ''}`} id={'report'}
                            >{thirdButton.name}</Nav.Link>}
                        </Nav.Item>
                    </Nav.Item>
                    <Nav.Item className={styles.navBlockRight}>
                        <Nav.Link as={Link} to={httpPages.Profile} className={styles.navItemProfile}>Профиль</Nav.Link>
                        <Nav.Link as={Link} to={httpPages.Login} onClick={() => {
                            this.RemoveToken()
                            let x = useNavigate()
                            x(0);
                        }} className={styles.navItemExit}><Image
                            src={exit}></Image></Nav.Link>
                    </Nav.Item>
                </Nav.Item>
            </Navbar>
        )
    }
}