import React from "react";
import styles from "./LeftButtonItem.module.css";
import {Button} from "react-bootstrap";
import ModalExampleBasic from "../ModalView/ModalConfirmChange";

interface props {
    h: number,
    w: number,
    student: string,
    onDataChange: () => void,
    canDataChange: boolean
}

export class LeftButtonItem extends React.Component<props, {
    showModal: boolean, selectedButton?: DOMTokenList
}> {

    constructor(props: Readonly<props> | props) {
        super(props);
        this.state = {showModal: false, selectedButton:  undefined}
    }

    SelectedButton = (event: DOMTokenList) => {

        const buttons = document.querySelectorAll('Button')
        for (let i = 0; i < buttons.length; i++) {
            if (buttons[i].classList.contains(styles.red)) {
                buttons[i].classList.remove(styles.red)
            }
        }

        event.toggle(styles.red)
    }

    render() {
        return (
            <Button onClick={(x) => {
                if (this.props.canDataChange) {
                    this.props.onDataChange();
                    this.SelectedButton(x.currentTarget.classList);
                } else {
                    this.setState({showModal: true, selectedButton: x.currentTarget.classList});
                }

            }} variant={''} bsPrefix={''} className={styles.orderButton}
                    style={{width: `${this.props.w}px`}}>
                <p className={styles.buttonText}>{this.props.student}</p>

                <ModalExampleBasic active={this.state.showModal}
                                   onClose={() => this.setState({showModal: false})}
                                   onSubmit={async () => {
                                       this.setState({showModal: false})
                                       this.SelectedButton(this.state.selectedButton!)
                                       await this.props.onDataChange();
                                       this.setState({showModal: false})
                                   }}>
                    <span> если вы измените ученика, то корзина будет очищена </span>
                </ModalExampleBasic>
            </Button>
        )
    }
}

export default LeftButtonItem
