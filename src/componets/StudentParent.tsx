import React from "react";
import {observer} from "mobx-react";
import Grade from "../Pages/ParentPages/Parent/Store/Grade";
import Toggle from "../Model/Toggle";
import {IStudent} from "../Pages/ParentPages/Parent/Store/IStudent";

@observer
class StudentParent extends React.Component<{ toggle: Toggle, grade: Grade, student: IStudent, LoadInfoGrade: (e: string) => Promise<void> }> {

// придумать как вставить toggle или оставить в store
    render() {
        return (
            <div>
                <p>{this.props.student.first_name}</p>
                <input type={"button"} onClick={async () => {
                    await this.props.LoadInfoGrade(this.props.student.grade)
                    this.props.toggle.ChangeToggle();
                }}/>
                <p>{this.props.toggle && this.props.grade.name}</p>
            </div>
        );
    }
}

export default StudentParent;