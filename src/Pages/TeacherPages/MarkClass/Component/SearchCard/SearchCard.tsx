import React from "react";
import styles from "./SearchCard.module.css"
import {Card, Image} from "react-bootstrap";
import find from "./Vector.png";


export class SearchCard extends React.Component{
    render() {
        return(
            <Card className={styles.foodCard}>
                <div className={styles.cardBlock}>
                        <Image src={find} className={styles.findIcon}></Image>
                        <input placeholder={"поиск"} type={"text"} className={styles.inputField}/>
                </div>
            </Card>
        )
    }
}
