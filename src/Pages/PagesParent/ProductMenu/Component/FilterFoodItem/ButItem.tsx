import React, {ReactEventHandler} from "react";
import {Button} from "react-bootstrap";
import styles from "./ButItem.module.css";

const changeClass = (event: React.MouseEvent) => {
    const buttons = document.querySelectorAll('Button')
    for (let i = 0; i < buttons.length; i++) {
        if (buttons[i].classList.contains(styles.redMenu)) {
            buttons[i].classList.remove(styles.redMenu)
        }
    }
    event.currentTarget.classList.toggle(styles.redMenu)
}


export class ButItem extends React.Component<{ h: number, w: number, value: string, ChangeMealCategory: () => void, active: boolean }> {


    render() {
        return (
            <Button onClick={(e) => {changeClass(e); this.props.ChangeMealCategory() }}
                    variant={''}
                    bsPrefix={''} className={`${styles.orderButtonMenu} ${this.props.active ? styles.redMenu : ''}` }
                    style={{width: `${this.props.w}px`, height: `${this.props.h}px`}}>
                <p className={styles.buttonText}>{this.props.value}</p>
            </Button>
        );
    }
}