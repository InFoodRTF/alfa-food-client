import React from "react";
import styles from "./BaseButItem.module.css";
import {Button} from "react-bootstrap";


export const BaseButItem = ({w = 0, h = 0, text = ""}) => {
    return(
        <Button variant={''} bsPrefix={''} className={styles.orderButton} style={{width: `${w}px`, height: `${h}px`}}>
            {text}
        </Button>
    )
}

