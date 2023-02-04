import React from "react";
import {inject, observer} from "mobx-react";
import UserStore from "../../Store/UserStore";
import ParentMenu from "../ParentMenu/ParentMenu";
import Parent from "../../Model/Parent";
import parent from "../../Model/Parent";

type defaultProps = {
    isLogin: boolean;
}
type props = {
    userStore: UserStore;
    isLogin : boolean;
} & defaultProps


@inject('userStore')
@observer
class UserMenu extends React.Component<{isLogin: boolean}> {
    get injected(): props {
        return this.props as props;
    }

    async componentDidMount() {
        await this.injected.userStore.AuthUserByToken();

        console.log("DinMount");
    }
        // параша с юзером, он не отображает после одной секунды исчезает 
    render() {
        const {userStore} = this.injected;
        return (
            <div>
               {userStore.User instanceof Parent && <ParentMenu User={userStore.User as parent}/>}
            </div>
        );
    }
}

export default UserMenu