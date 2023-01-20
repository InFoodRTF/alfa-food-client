import User from "../../ViewModel/User";
import React from "react";

export default class UserName extends React.Component<{userName: User}> {

    render() {
        return (
                <div>
                    <input
                        type="username"
                        name="username"
                        placeholder="Введите логин"
                        onChange={e => this.props.userName.ChangeName(e.target.value)}
                    />
                </div>
        );
    }
}