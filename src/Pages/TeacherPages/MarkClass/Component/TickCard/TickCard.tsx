import React from "react";
import styles from "./TickCard.module.css";
import {Card} from "react-bootstrap";
import {IStudent} from "../../../../ParentPages/ParentProfile/Store/IStudent";
import {getFullName} from "../../../../../Lib/Transormators";
import {observer} from "mobx-react";

@observer
export class TickCard extends React.Component<{ student: IStudent }> {//у каждой галочки должен быть уникальный id, например фио
    render() {
        console.log(this.props.student.first_name,  "внутри TickCard")
        return (
            <Card className={styles.foodCard}>
                <div className={styles.cardBlock}>
                    <div className={styles.infBlock}>
                        <input type={"checkbox"} id={this.props.student.id.toString()}></input>
                        <label htmlFor={"student"}></label>
                    </div>
                    <div className={styles.addInfBlock}>
                        <p className={styles.textAdd}>{getFullName(this.props.student)}</p>
                    </div>
                </div>
            </Card>
        )
    }
}
