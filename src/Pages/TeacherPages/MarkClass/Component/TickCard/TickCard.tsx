import React from "react";
import styles from "./TickCard.module.css";
import {Card} from "react-bootstrap";
import {getFullName} from "../../../../../Lib/Transormators";
import {observer} from "mobx-react";
import {AttendedStudent} from "../../Store/attendedGrade";



@observer
export class TickCard extends React.Component<{ studentAttend: AttendedStudent, onChange: () => void }> {//у каждой галочки должен быть уникальный id, например фио
    render() {
        return (
            <Card className={styles.foodCard}>
                <div className={styles.cardBlock}>
                    <div className={styles.infBlock}>
                        <input onChange={() => this.props.onChange()} defaultChecked={this.props.studentAttend.mark_attendance} type="checkbox" id={this.props.studentAttend.student!.id.toString()}/>
                        <label htmlFor={"student"}></label>
                    </div>
                    <div className={styles.addInfBlock}>
                        <p className={styles.textAdd}>{getFullName(this.props.studentAttend.student!)}</p>
                    </div>
                </div>
            </Card>
        )
    }
}
