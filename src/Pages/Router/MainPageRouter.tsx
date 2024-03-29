import React from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import {Navibar} from "../../componets/Navbar/Navibar";
import HttpPages from "../PagesPath";
import OrdersMenu from "../PagesParent/Orders/OrdersMenu";
import ProductMenu from "../PagesParent/ProductMenu/ProductsMenu";
import {inject, observer} from "mobx-react";
import IUser from "../../Model/Interface/IUser";
import Role from "../../Model/Enum/Role";
import httpPages from "../PagesPath";
import {MarkGrades} from "../PagesTeacher/MarkClass/MarkGrades";
import {Footer} from "../../componets/Footer/Footer";
import {Profile} from "../Profile/Profile";
import UserStore from "../UserStore";
import {AssembleMenu} from "../PagesCooker/AssembleMenu/AssembleMenu";
import {CookingUploadRep} from "../PagesCooker/Report/CookingUploadRep";
import {PageComponent} from "../PageComponent";

type props = {
    userStore: UserStore;
}

@inject("userStore")
@observer
export class MainPageRouter extends PageComponent<props> {
    async componentDidMount() {
        await this.injected.userStore.AuthByToken();
        this.injected.userStore.LoadIsComplete();
    }

    public GetNaviBarUser(user: IUser): JSX.Element { // todo можно сделать так, чтоб он навигировал на правильную страницу, а не через profile

        switch (user.role) {
            case Role.Parent:
                return <Navibar LeftButton={{name: "Заказать питание", link: HttpPages.Products}}
                                SecondButton={{name: "Посмотреть заказы", link: HttpPages.Orders}}/>;
            case Role.Teacher:
                return <Navibar LeftButton={{name: "Отметить класс", link: httpPages.MyClass}}
                                SecondButton={{name: "Выгрузить отчет", link: httpPages.UploadData}}/>
            case Role.Cooker:
                return <Navibar LeftButton={{name: "Cоставить меню", link: httpPages.CreateMenu}}
                                SecondButton={{name: "Создать блюдо", link: httpPages.NotFound}}
                                thirdButton={{name: "Выгрузить отчёт", link: httpPages.UploadReport}}/>
            default:
                return <></>
        }
        // и так всех остальных
    }

    render() {
        let {userStore} = this.injected;
        console.log("получин тип пользователя:",userStore.User.role)
        // todo придумать loading, сейчас выходит, что шапка дольше идёт чем сама страничка

        return (
            <div>
                {this.GetNaviBarUser(userStore.User)}
                <Routes>
                    <Route path={HttpPages.Profile} element={<Profile/>}/>
                    <Route path={HttpPages.Orders} element={<OrdersMenu/>}/>
                    <Route path={HttpPages.Products} element={<ProductMenu/>}/>
                    <Route path={HttpPages.MyClass} element={<MarkGrades/>}/>
                    <Route path={httpPages.CreateMenu} element={<AssembleMenu/>}/>
                    <Route path={httpPages.UploadReport} element={<CookingUploadRep/>}/>
                    <Route path={"*"} element={<Navigate to={HttpPages.Login}/>}/>
                </Routes>
                <Footer/>
            </div>
        );
    }
}