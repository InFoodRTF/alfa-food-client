import React from "react";
import { Button } from "react-bootstrap";
import styles from "./BaseButItem.module.css"

export class BaseButItem extends React.Component<{w: number, h:number, text:string, style?:string , onClick: () => void}> { // h - сейчас ничего не делает
    render() {
        return (
            <Button variant={''} bsPrefix={''} onClick={() => this.props.onClick()} className={this.props.style ?? styles.orderButton } style={{width: `${this.props.w}px`}}>
                {this.props.text}
            </Button>);
    }
}

