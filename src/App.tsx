import React from 'react';
import {observer} from "mobx-react";
import {Route, Routes} from "react-router-dom";
import UserMenu from "./Pages/UserMenu/UserMenu";
import LoginMenu from "./Pages/LoginMenu/LoginMenu";
import OrdersMenu from "./Pages/OrdersMenu/OrdersMenu";
import httpPages from "./Pages/HttpPages";
import PageNotFound from "./Pages/PageNotFound/PageNotFound";


@observer
class App extends React.Component {

    render() {
        return (
            <div>
                <Routes>
                        <Route path={httpPages.Auth} element={<LoginMenu/>}/>
                        <Route path={httpPages.Profile} element={<UserMenu/>}/>
                        <Route path={httpPages.Orders} element={<OrdersMenu/>}/>
                        <Route path={httpPages.NotFound} element={<PageNotFound/>}/>;
                </Routes>
            </div>
        );
    }
}

export default App;

//<Route path={"/Profile//*"} element={<UserMenu/>}>   //* для того, чтоб внутри делать routes.