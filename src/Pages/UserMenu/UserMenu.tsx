import React from "react";
import {inject, observer} from "mobx-react";
import UserStore from "../../Store/UserStore";

type props = {
    userStore: UserStore;
}

@inject('userStore')
@observer
class UserMenu extends React.Component{
    get injected(): props{
        return this.props as props;
    }

    async componentDidMount() {
        await this.injected.userStore.RecognizeUser();
        console.log("gos");
    }

    render() {
        const {userStore} = this.injected;
        return (
            <div>
                <p>{userStore.User.username}{userStore.User.first_name} {userStore.User.role}</p>
            </div>
        );
    }
}

export default UserMenu