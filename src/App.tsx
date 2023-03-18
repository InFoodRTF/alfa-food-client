import React from 'react';
import {observer} from "mobx-react";
import {Route, Routes} from "react-router-dom";
import Profile from "./Pages/UsersMenu/Profile/Profile";
import AuthMenu from "./Pages/AuthMenu/AuthMenu";
import OrdersMenu from "./Pages/UsersMenu/Orders/OrdersMenu";
import httpPages from "./Pages/HttpPages";
import PageNotFound from "./Pages/PageNotFound/PageNotFound";
import TakeOrderMenu from "./Pages/TakeOrderMenu/TakeOrderMenu";


@observer
class App extends React.Component {

    render() {
        return (
            <div>
                <Routes>
                        <Route path={httpPages.Auth} element={<AuthMenu/>}/>
                        <Route path={httpPages.Profile} element={<Profile/>}/>
                        <Route path={httpPages.Orders} element={<OrdersMenu/>}/>
                        <Route path={httpPages.MenuUsers} element={<TakeOrderMenu/>}/>
                        <Route path={httpPages.NotFound} element={<PageNotFound/>}/>;
                </Routes>
            </div>
        );
    }
}

export default App;

//<Route path={"/Profile//*"} element={<Profile/>}>   //* для того, чтоб внутри делать routes.