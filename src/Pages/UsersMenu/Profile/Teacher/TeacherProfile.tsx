import React from "react";
import ITeacher from "../../../../Model/Interface/ITeacher";


class TeacherProfile extends React.Component<{ user: ITeacher }> {
    render() {
       return (
         <div>
              Профайл учителя
         </div>
       )
    }

}

export default TeacherProfile;
