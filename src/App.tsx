import React from 'react';
import {observer} from "mobx-react";
import {Route, Routes} from "react-router-dom";
import Profile from "./Pages/UsersMenu/Profile/Profile";
import AuthMenu from "./Pages/AuthMenu/AuthMenu";
import OrdersMenu from "./Pages/ParentPages/Orders/OrdersMenu";
import httpPages from "./Pages/HttpPages";
import ProductMenu from "./Pages/ParentPages/ProductMenu/ProductMenu";
import {RecognizeRole} from "./Pages/SwitherRole/RecognizeRole";


@observer // пиздец здесь происходит ваще жесть, ааааааааааааааа
class App extends React.Component {

    render() {
        return (
            <div>
                <Routes>
                    <Route path={httpPages.Auth} element={<AuthMenu/>}/>
                    <Route path={"*"} element={<RecognizeRole/>}/>
                </Routes>
            </div>
        );
    }
}

export default App;

//<Route path={"/Profile//*"} element={<Profile/>}>   //* для того, чтоб внутри делать routes.