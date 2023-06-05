import React, {useState} from "react";
import styles from "./InputCook.module.css"
import {Button, Card, Image} from "react-bootstrap";
import pen from "./Img/Pen.svg";
import bin from "./Img/Bin.svg";


export const InputCook = () => {
    const [disabled, setDisabled] = useState(true)

        const changeMode = () => {
            setDisabled(false)
        }

    return(
        <Card className={styles.foodCard}>
            <div className={styles.cardBlock}>
                <input type={"text"} className={styles.inputField} disabled={disabled}/>
                <div className={styles.imgBlock}>
                    <Button variant={''} bsPrefix={''} className={styles.btn} onClick={changeMode}><Image src={pen} className={styles.penIcon}></Image></Button>
                    <Button variant={''} bsPrefix={''} className={styles.btn}><Image src={bin} className={styles.binIcon}></Image></Button>
                </div>
            </div>
        </Card>
    )
}
