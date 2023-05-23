import React from "react";
import AuthUser from "../../Pages/Login/Model/AuthUser";
import {observer} from "mobx-react";

@observer
export default class InputLogin extends React.Component<{ user: AuthUser }> {

    render() {
        return (
            <div>
                <input
                    type="username"
                    name="username"
                    placeholder="Введите логин"
                    onChange={e => this.props.user.ChangeUserName(e.target.value)}
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Введите пароль"
                    onChange={e => this.props.user.ChangePassword(e.target.value)}
                />
            </div>)
            ;

        // добавить еще htmlем пароль!
    };
}
