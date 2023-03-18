import React from "react";
import Student from "../Model/Student";
import {observer} from "mobx-react";
import Grade from "../Model/Grade";
import Toggle from "../Model/Toggle";

@observer
class StudentParent extends React.Component<{toggle: Toggle, grade: Grade, student: Student, LoadInfoGrade: (e: string) => Promise<void> }> {

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