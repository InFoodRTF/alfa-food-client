import reportWebVitals from "./reportWebVitals";
import App from "./App";
import {Provider} from "mobx-react";
import React from 'react';
import ReactDOM from 'react-dom/client';
import AuthStore from "./Store/AuthStore";
import {BrowserRouter} from "react-router-dom";
import UserStore from "./Store/UserStore";
import OrdersStore from "./Store/OrdersStore";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

// strict.mode убран!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! ВАЖНО ОЧЕНЬ ВАЖНО
root.render(
        <Provider authStore={new AuthStore()} userStore={new UserStore()} orderStore={new OrdersStore()}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>

        </Provider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
