import React from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import {Navibar} from "../../componets/Navbar/Navibar";
import Profile from "../UsersMenu/Profile/Profile";
import HttpPages from "../HttpPages";
import OrdersMenu from "../ParentPages/Orders/OrdersMenu";
import ProductMenu from "../ParentPages/ProductMenu/ProductsMenu";
import {inject, observer} from "mobx-react";
import IUser from "../../Model/Interface/IUser";
import Role from "../../Model/Enum/Role";
import userStore from "../UsersMenu/UserStore";
import IParent from "../../Model/Interface/IParent";
import httpPages from "../HttpPages";
import {MarkGrades} from "../TeacherPages/MarkClass/MarkGrades";
import {Footer} from "../../componets/Footer/Footer";
import Requests from "../../Api/Requests";

type props = {
    userStore: userStore;
}

@inject("userStore")
@observer
export class RecognizeRole extends React.Component {

    async componentDidMount() {
        await this.injected.userStore.AuthByToken();
        await this.injected.userStore.ChangeLoad();
    }

    get injected() {
        return this.props as props;
    }

    public GetNaviBarUser(user: IUser): JSX.Element { // todo можно сделать так, чтоб он навигировал на правильную страницу, а не через profile

        switch (user.role) {
            case Role.Parent:
                return <Navibar LeftButton={{name: "Заказать питание", link: HttpPages.Products}}
                                rightButton={{name: "Посмотреть заказы", link: HttpPages.Orders}}/>;
            case Role.Teacher:
                return <Navibar LeftButton={{name: "Отметить класс", link: httpPages.MyClass}}
                                rightButton={{name: "Выгрузить отчет", link: httpPages.UploadData}}/>

            default:
                return <></>
        }
        // и так всех остальных
    }

    render() {
        let {userStore} = this.injected;
        console.log(userStore.User.role)
        if (userStore.loading) {
            return <></>
        }

        return (
            <div>
                {this.GetNaviBarUser(userStore.User)}
                <Routes>
                    <Route path={HttpPages.Profile} element={<Profile user={userStore.User}/>}/>
                    <Route path={HttpPages.Orders} element={<OrdersMenu user={userStore.User as IParent}/>}/>
                    <Route path={HttpPages.Products} element={<ProductMenu/>}/>
                    <Route path={HttpPages.MyClass} element={<MarkGrades/>}/>
                </Routes>
                <Footer/>
            </div>
        );
    }
}