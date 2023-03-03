import React from "react";
import Student from "../Model/Student";
import {observer} from "mobx-react";
import grade from "../Model/Grade";

@observer
class StudentParent extends React.Component<{grade: grade , id: number, student: Student, LoadInfoGrade: (e: string) => Promise<void>}> {

    render() {
        return (
            <div>
                <input type={"button"} onClick={() => this.props.LoadInfoGrade(this.props.student.grade)}/>
                <p></p>
            </div>
        );
    }

}

export default StudentParent;