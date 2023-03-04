import React from "react";
import IParent from "../../../Model/Interface/IParent";
import {inject, observer} from "mobx-react";
import "./ParentMenuStyles.css";
import StudentsStore from "../../../Store/StudentsStore";
import Header from "../../../componets/Header/Header";
import StudentParent from "../../../componets/StudentParent";

type injProps = {
    studentStore: StudentsStore;
    user: IParent;
}

@inject("studentStore")
@observer
class ParentProfile extends React.Component<{ user: IParent }, any> {
    get injected(): injProps {
        return this.props as injProps;
    }

    async componentDidMount() {
        await this.injected.studentStore.LoadStudent();
    }

    render() {
        let {studentStore, user} = this.injected;
        console.log(this.props.user.balance)
        console.log("это меню родителя")
        return <div>
            <Header/>
            {studentStore.Students.map((st, index) => <StudentParent id={index} grade={studentStore.Grades[index]} key={index} student={st}
                                                                     LoadInfoGrade={(e: string) => studentStore.LoadInfoGrade(e)}/>)} //
            мб можно проще =)))
        </div>
            ;
    }
}

export default ParentProfile;