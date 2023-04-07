import React from "react";
import { Button } from "react-bootstrap";
import styles from "./ButItem.module.css";
export const ButItem = ({h = 0, w = 0, text = ""}) => {
    return (
        // eslint-disable-next-line react/jsx-no-undef
        <Button variant={''} bsPrefix={''} className={styles.orderButton} style={{width: `${w}px`, height: `${h}px`}}>
            <p className={styles.buttonText}>{text}</p>
        </Button>
    )
}