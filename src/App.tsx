import React from 'react';
import './App.css';
import {observer} from "mobx-react";
import {Route, Routes} from "react-router-dom";
import UserMenu from "./Pages/UserMenu/UserMenu";
import LoginMenu from "./Pages/LoginMenu/LoginMenu";
import OrdersMenu from "./Pages/OrdersMenu/OrdersMenu";


@observer
class App extends React.Component {

    render() {
        return (
            <div>
                <Routes>
                    <Route path={'/'} element={<LoginMenu/>}/>
                    <Route path={"/Profile//*"} element={<UserMenu/>}>
                    </Route>
                </Routes>
            </div>
        );
    }
}

export default App;
