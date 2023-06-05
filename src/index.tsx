import reportWebVitals from "./reportWebVitals";
import App from "./App";
import {Provider} from "mobx-react";
import React from 'react';
import ReactDOM from 'react-dom/client';
import AuthStore from "./Pages/Login/AuthStore";
import {BrowserRouter} from "react-router-dom";
import UserStore from "./Pages/UserStore";
import OrdersStore from "./Pages/PagesParent/Orders/OrdersStore";
import StudentsStore from "./Pages/Store/StudentsStore";

import ProductsStore from "./Pages/PagesParent/ProductMenu/ProductsStore";
import CartStore from "./Pages/PagesParent/ProductMenu/CartStore";
import CalendarSwitch from "./Pages/PagesParent/ProductMenu/Model/CalendarSwitch";
import {GradesStore} from "./Pages/PagesTeacher/MarkClass/Store/GradesStore";
import {MenuStore} from "./Pages/PagesCooker/Store/MenuStore";
//server()
    //const Stores = [new AuthStore(), new UserStore(), new OrdersStore(), new StudentsStore()] // когда нибдуь я впихну через массив


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
const Calendar = new CalendarSwitch();
const stores = {
    authStore: new AuthStore(),
    userStore: new UserStore(),
    orderStore: new OrdersStore(),
    studentStore: new StudentsStore(),
    productsStore: new ProductsStore(Calendar),
    cartStore: new CartStore(Calendar),
    gradesStore: new GradesStore(Calendar),
    menuStore: new MenuStore(Calendar)
}
// strict.mode убран!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! ВАЖНО ОЧЕНЬ ВАЖНО
root.render(
    <Provider {...stores}>
        <BrowserRouter >
            <App/>
        </BrowserRouter>

    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
