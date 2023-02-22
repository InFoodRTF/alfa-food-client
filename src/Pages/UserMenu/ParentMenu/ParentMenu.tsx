import React from "react";
import IParent from "../../../Model/Interface/IParent";
import {observer} from "mobx-react";
import "./ParentMenuStyles.css";
import Header from "../../../componets/Header/Header";



@observer
class ParentMenu extends React.Component<{ user: IParent }, any> {
//TODO придумать норм реализацию layout а это это кринж лютый писать шакбки в каждой и плюс постоянно их рендерить - кринж один словом


    render() {

        console.log(this.props.user.balance)
        console.log("это меню родителя")
        return (
            <Header/>
        );
    }
}

export default ParentMenu;