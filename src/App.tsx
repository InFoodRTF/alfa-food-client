import React from 'react';
import {observer} from "mobx-react";
import {Route, Routes} from "react-router-dom";
import httpPages from "./Pages/PagesPath";
import {Router} from "./Pages/Router/Router";
import {LoginPage} from "./Pages/Login/LoginPage";

@observer // пиздец здесь происходит ваще жесть, ааааааааааааааа
class App extends React.Component {

    render() {
        return (
            <div>
                <Routes >
                    <Route path={httpPages.Login} element={<LoginPage/>}/>
                    <Route path={"*"} element={<Router/>}/>
                </Routes>
            </div>
        );
    }
}

export default App;

//<Route path={"/Profile//*"} element={<Profile/>}>   //* для того, чтоб внутри делать routes.