import React from "react";
import AuthUser from "../../ViewModel/AuthUser";

export default class InputLogin extends React.Component<{user: AuthUser}> {

    render() {
        return (
            <div>
                <input
                    type="username"
                    name="username"
                    placeholder="Введите логин"
                    onChange={e => this.props.user.ChangeName(e.target.value)}
                />
            </div>
        );
        // добавить еще htmlем пароль!
    };
}
