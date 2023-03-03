import React from 'react';
import {observer} from "mobx-react";
import {Route, Routes} from "react-router-dom";
import Profile from "./Pages/Profile/Profile";
import LoginMenu from "./Pages/LoginMenu/LoginMenu";
import OrdersMenu from "./Pages/Orders/OrdersMenu";
import httpPages from "./Pages/HttpPages";
import PageNotFound from "./Pages/PageNotFound/PageNotFound";


@observer
class App extends React.Component {

    render() {
        return (
            <div>
                <Routes>
                        <Route path={httpPages.Auth} element={<LoginMenu/>}/>
                        <Route path={httpPages.Profile} element={<Profile/>}/>
                        <Route path={httpPages.Orders} element={<OrdersMenu/>}/>
                        <Route path={httpPages.NotFound} element={<PageNotFound/>}/>;
                </Routes>
            </div>
        );
    }
}

export default App;

//<Route path={"/Profile//*"} element={<Profile/>}>   //* для того, чтоб внутри делать routes.