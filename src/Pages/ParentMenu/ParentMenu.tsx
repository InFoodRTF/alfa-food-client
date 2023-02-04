import React from "react";
import IParent from "../../Model/Interface/IParent";
import IUser from "../../Model/Interface/IUser";

class ParentMenu extends React.Component<{ User: IParent }> {
    render() {
        return (
            <div>
                <p>это меню родителя</p>
            </div>
        );
    }
}

export default ParentMenu;