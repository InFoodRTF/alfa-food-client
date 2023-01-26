import reportWebVitals from "./reportWebVitals";
import App from "./App";
import {Provider} from "mobx-react";
import React from 'react';
import ReactDOM from 'react-dom/client';
import AuthStore from "./Store/AuthStore";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ParentMenu from "./Pages/ParentMenu/ParentMenu";
import UserStore from "./Store/UserStore";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);


root.render(
    <React.StrictMode>
        <Provider authStore={new AuthStore()} userStore={new UserStore()}>
            <BrowserRouter>
                <Routes>
                    <Route path={'/'} element={<App/>}/>
                    <Route path={'/Profile'} element={<ParentMenu/>}/>
                </Routes>
            </BrowserRouter>

        </Provider>

    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
