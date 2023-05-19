import React from "react";
import styles from "./LeftButtonItem.module.css";
import {Button} from "react-bootstrap";
import ModalExampleBasic from "../ModalView/ModalConfirmChange";
import {Observer, observer} from "mobx-react";

interface props {
    h: number,
    w: number,
    student: string,
    onDataChange: () => void,
    canDataChange: boolean
}

@observer
export class LeftButtonItem extends React.Component<props, {
    showModal: boolean, selectedButton?: DOMTokenList
}> {

    constructor(props: Readonly<props> | props) {
        super(props);
        this.state = {showModal: false, selectedButton: undefined}
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
                } else if (!this.state.showModal) { // если это убрать кнопка "нет" в модальном не будет работать. как я понял при нажатий и открываний окна постоянно запускается этот onСlick или потому что не сразу обновляет showmodal - я точно хз
                    this.setState({showModal: true, selectedButton: x.currentTarget.classList});
                }

            }} variant={''} bsPrefix={''} className={styles.orderButton}
                    style={{width: `${this.props.w}px`}}>
                <p className={styles.buttonText}>{this.props.student}</p>

                <ModalExampleBasic active={this.state.showModal}
                                   onClose={() => {
                                       this.setState({showModal: false})
                                   }}
                                   onSubmit={async () => {
                                       this.SelectedButton(this.state.selectedButton!)
                                       this.setState({showModal: false})
                                       await this.props.onDataChange();
                                   }}>
                    <span> если вы измените ученика, то корзина будет очищена </span>
                </ModalExampleBasic>
            </Button>
        )
    }
}

export default LeftButtonItem
