import React from "react";
import IParent from "../../../Model/Interface/IParent";

class ParentMenu extends React.Component<{ user: IParent }> {
    render() {
        console.log("это меню родителя")
        return (
            <div>
                <p>это меню родителя</p>
            </div>
        );
    }
}

export default ParentMenu;