import React from "react";
import styles from "./Account.module.css"


export class Account extends React.Component<{desc: string, text: string}>{
    render() {
        return(
            <div>
                <div className={styles.cardBlock}>
                    <p className={styles.text}>{this.props.desc}</p>
                    <input type={"text"} value={this.props.text} className={styles.inputField}/>
                </div>
            </div>
        )
    }
}
