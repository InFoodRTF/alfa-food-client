import React from 'react';
import {observer} from "mobx-react";
import {Route, Routes} from "react-router-dom";
import AuthMenu from "./Pages/AuthMenu/AuthMenu";
import httpPages from "./Pages/HttpPages";
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