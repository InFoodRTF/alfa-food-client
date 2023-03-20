import React from "react";
import LeftButtonItem from "./LeftButtonItem";
import CalendarView from "../Calendar/CalendarView";
import CalendarSwitch from "../../Model/CalendarSwitch";
import {IStudent} from "../../Pages/UsersMenu/Profile/Parent/Store/IStudent";


class LeftMenu extends React.Component<{ calendar: CalendarSwitch, student: IStudent[] }> {

    render() {
        return (
            <div style={{display: "flex", flexDirection: "column", gap: "52px"}}>
                <CalendarView calendar={this.props.calendar}/>
                <div style={{display: "flex", flexDirection: "column", gap: "20px"}}>
                    {this.props.student.map(student => <LeftButtonItem key={student.id} w={265} h={49}
                                                                       text={student.first_name + " " + student.middle_name + " " + student.last_name}/>)}
                </div>
            </div>
        )
    }
}

export default LeftMenu
