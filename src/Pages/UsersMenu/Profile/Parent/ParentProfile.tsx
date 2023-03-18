import React from "react";
import IParent from "../../../../Model/Interface/IParent";
import {inject, observer} from "mobx-react";
import "./ParentMenuStyles.css";
import StudentsStore from "../../../../Store/StudentsStore";
import StudentParent from "../../../../componets/StudentParent";
import Navibar from "../../../../componets/Navbar/Navibar";
import FieldProfile from "../../../../componets/FieldProfile/FieldProfile";

type injProps = {
    studentStore: StudentsStore;
    user: IParent;
}

@inject("studentStore")
@observer
class ParentProfile extends React.Component<{ user: IParent }> {
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
            <Navibar/>
            <FieldProfile descr={"имя"} info={user.username}/>
            {studentStore.Students.map((st) => <StudentParent toggle={studentStore.Toggle[st.grade]} grade={studentStore.Grades[st.grade]} key={st.id} student={st}
                                                                     LoadInfoGrade={(e: string) => studentStore.LoadInfoGrade(e)}/>)}
            {user.first_name} {user.middle_name}
        </div>

    }
}

export default ParentProfile;