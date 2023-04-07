import reportWebVitals from "./reportWebVitals";
import App from "./App";
import {Provider} from "mobx-react";
import React from 'react';
import ReactDOM from 'react-dom/client';
import AuthStore from "./Pages/AuthMenu/AuthStore";
import {BrowserRouter} from "react-router-dom";
import UserStore from "./Pages/UsersMenu/UserStore";
import OrdersStore from "./Pages/ParentPages/Orders/OrdersStore";
import StudentsStore from "./Pages/ParentPages/Parent/Store/StudentsStore";

import ProductsStore from "./Pages/ParentPages/ProductMenu/ProductsStore";
import server from "./Api/MockServer";

// TODO почему та роле станвоится на 1 больше хз почему но это факт
server()
const Stores = [new AuthStore(), new UserStore(), new OrdersStore(), new StudentsStore()] // когда нибдуь я впихну через массив


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

// strict.mode убран!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! ВАЖНО ОЧЕНЬ ВАЖНО
root.render(
    <Provider authStore={new AuthStore()} userStore={new UserStore()} orderStore={new OrdersStore()}
              studentStore={new StudentsStore()} productsStore={new ProductsStore()}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>

    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
