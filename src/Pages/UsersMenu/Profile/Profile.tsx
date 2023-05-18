import React from "react";
import {observer} from "mobx-react";
import ParentProfile from "../../ParentPages/ParentProfile/ParentProfile";
import parent from "../../../Model/Role/Parent";
import Role from "../../../Model/Enum/Role";
import CookerProfile from "./Cooker/CookerMenu";
import Cooker from "../../../Model/Role/Cooker";
import Teacher from "../../../Model/Role/Teacher";
import TeacherProfile from "./Teacher/TeacherProfile";
import IUser from "../../../Model/Interface/IUser";

/*
type defaultProps = {
    isLogin: boolean;
}
type props = {
    userStore: UserStore;  штука ради примера авось я забуду что так можно

} & defaultProps
*/


@observer
class Profile extends React.Component<{ user: IUser }> {

    // TODO доделать этот свич
    private SwitchUser(user: IUser) {
        switch (user.role) {
            case Role.Parent:
                return <ParentProfile user={this.props.user as parent}/>;
            case Role.Teacher:
                return <TeacherProfile user={this.props.user as Teacher}/>
            case Role.Cooker:
                return <CookerProfile user={this.props.user as Cooker}/>
            default:
                return <></>
        }
    }

    render() {
        console.log("role : " + this.props.user.role)
        return (
            <div>
                {this.SwitchUser(this.props.user)}
            </div>
        );
    }
}

export default Profile