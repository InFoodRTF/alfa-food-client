import React from "react";
import styles from "./LeftButtonItem.module.css";
import {Button} from "react-bootstrap";
import {IStudent} from "../../Pages/ParentPages/ParentProfile/Store/IStudent";


export class LeftButtonItem extends React.Component<{h:number, w :number, student: IStudent, ChangeId: (e:number) => void}> {
     changeClass = (event: any, studentId: number ) => {
         this.props.ChangeId(studentId)
        const buttons = document.querySelectorAll('Button')
        for (let i = 0; i < buttons.length; i++) {
            if (buttons[i].classList.contains(styles.red)) {
                buttons[i].classList.remove(styles.red)
            }
        }
        event.currentTarget.classList.toggle(styles.red)
    }
    GetFullName(student: IStudent): string {
        return `${student.first_name} ${student.middle_name} ${student.last_name}` // ваще можно было бы ватащить и в класс, ибо так то много где нужно это
    }
    render() {
        return(
            <Button onClick={(x) => this.changeClass(x, this.props.student.id)} variant={''} bsPrefix={''} className={styles.orderButton} style={{width: `${this.props.w}px`, height: `${this.props.h}px`}}>
                <p className={styles.buttonText}>{this.GetFullName(this.props.student)}</p>
            </Button>
        )
    }
}
export default LeftButtonItem
