import React from "react";
import LeftButtonItem from "./LeftButtonItem";
import CalendarView from "../Calendar/CalendarView";
import CalendarSwitch from "../../Pages/ParentPages/ProductMenu/Model/CalendarSwitch";
import {IStudent} from "../../Pages/ParentPages/ParentProfile/Store/IStudent";


class LeftMenu extends React.Component<{ calendar: CalendarSwitch, student: IStudent[] }> {
    GetFullName(student: IStudent): string {
        return `${student.first_name} ${student.middle_name} ${student.last_name}` // ваще можно было бы ватащить и в класс, ибо так то много где нужно это
    }

    render() {
        return (
            <div style={{display: "flex", flexDirection: "column", gap: "52px"}}>
                <CalendarView calendar={this.props.calendar}/>
                <div style={{display: "flex", flexDirection: "column", gap: "20px"}}>
                    {this.props.student.map(student => <LeftButtonItem key={student.id} w={265} h={49}
                                                                       text={this.GetFullName(student)}/>)}
                </div>
            </div>
        )
    }
}

export default LeftMenu
