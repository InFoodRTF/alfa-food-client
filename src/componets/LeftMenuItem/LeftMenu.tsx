import React from "react";
import LeftButtonItem from "./LeftButtonItem";
import CalendarView from "../Calendar/CalendarView";
import CalendarSwitch from "../../Model/CalendarSwitch";
import Student from "../../Model/Student";


class LeftMenu extends React.Component<{ calendar: CalendarSwitch, student: Student[] }> {

    render() {
        return (
            <div style={{display: "flex", flexDirection: "column", gap: "52px"}}>
                <CalendarView calendar={this.props.calendar}/>
                <div style={{display: "flex", flexDirection: "column", gap: "20px"}}>
                    {this.props.student.map(student => <LeftButtonItem w={265} h={49}
                                                                       text={student.first_name + " " + student.middle_name + " " + student.last_name}/>)}
                </div>
            </div>
        )
    }
}

export default LeftMenu
