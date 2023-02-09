import React from "react";
import {inject, observer} from "mobx-react";
import UserStore from "../../Store/UserStore";
import ParentMenu from "./ParentMenu/ParentMenu";
import parent from "../../Model/Role/Parent";
import Role from "../../Model/Enum/Role";
import CookerMenu from "./CookerMenu/CookerMenu";
import Cooker from "../../Model/Role/Cooker";
import Teacher from "../../Model/Role/Teacher";
import TeacherMenu from "./TeacherMenu/TeacherMenu";

/*
type defaultProps = {
    isLogin: boolean;
}
type props = {
    userStore: UserStore;  штука ради примера авось я забуду что так можно

} & defaultProps
*/

type props = {
    userStore: UserStore;
}

@inject('userStore')
@observer
class UserMenu extends React.Component {
    get injected(): props {
        return this.props as props;
    }

    async componentDidMount() {
        await this.injected.userStore.AuthUserByToken();

        console.log("DinMount");
    }

    render() {
        const {userStore} = this.injected;
        console.log(userStore.User.role)
        return (
            <div>
                {userStore.User.role === Role.Parent && <ParentMenu user={userStore.User as parent}/>}
                {userStore.User.role === Role.Cooker && <CookerMenu user={userStore.User as Cooker}/>}
                {userStore.User.role === Role.Teacher && <TeacherMenu user={userStore.User as Teacher}/>}
            </div>
        );
    }
}

export default UserMenu