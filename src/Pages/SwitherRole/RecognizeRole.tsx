import React, {JSXElementConstructor} from "react";
import {Route, Routes} from "react-router-dom";
import {Navibar} from "../../componets/Navbar/Navibar";
import Profile from "../UsersMenu/Profile/Profile";
import HttpPages from "../HttpPages";
import OrdersMenu from "../ParentPages/Orders/OrdersMenu";
import ProductMenu from "../ParentPages/ProductMenu/ProductMenu";
import {inject} from "mobx-react";
import IUser from "../../Model/Interface/IUser";
import Role from "../../Model/Enum/Role";
import userStore from "../UsersMenu/UserStore";

type props = {
    userStore: userStore;
}
@inject("userStore")
export class RecognizeRole extends React.Component<any, any> {
    async componentDidMount() {
        await this.injected.userStore.AuthByToken();

        console.log("DinMount");
    }
    get injected() {
        return this.props as props;
    }
    public GetNaviBarUser(user: IUser) : JSX.Element {

        switch (user.role) {
            case Role.Parent:
                return <Navibar/>;
            default:
                return <Navibar/>
        }
        // и так всех остальных
    }
    render() {
       let {userStore} = this.injected;
        console.log(userStore.User.role)
        return (
            <div>
                {this.GetNaviBarUser(userStore.User)}
                <Routes>
                    <Route path={HttpPages.Profile} element={<Profile user={userStore.User}/>}/>
                    <Route path={HttpPages.Orders} element={<OrdersMenu/>}/>
                    <Route path={HttpPages.Products} element={<ProductMenu/>}/>
                </Routes>
            </div>
        );
    }
}