import React from "react";
import LeftButtonItem from "./LeftButtonItem";
import CalendarView from "../Calendar/CalendarView";
import CalendarSwitch from "../../Pages/ParentPages/ProductMenu/Model/CalendarSwitch";
import {IStudent} from "../../Pages/ParentPages/ParentProfile/Store/IStudent";


class LeftMenu extends React.Component<{
    calendar: CalendarSwitch,
    student: IStudent[],
    ChangeId: (e: number) => void
}> {
    render() {
        return (
            <div style={{display: "flex", flexDirection: "column", gap: "52px"}}>
                <CalendarView calendar={this.props.calendar}/>
                <div style={{display: "flex", flexDirection: "column", gap: "20px"}}>
                    {this.props.student.map(student =>
                        <LeftButtonItem key={student.id} w={265} h={49} student={student} ChangeId={(e) => this.props.ChangeId(e)}/>)}
                </div>
            </div>
        )
    }
}

export default LeftMenu
