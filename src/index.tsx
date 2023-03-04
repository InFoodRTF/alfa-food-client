import reportWebVitals from "./reportWebVitals";
import App from "./App";
import {Provider} from "mobx-react";
import React from 'react';
import ReactDOM from 'react-dom/client';
import AuthStore from "./Store/AuthStore";
import {BrowserRouter} from "react-router-dom";
import UserStore from "./Store/UserStore";
import OrdersStore from "./Store/OrdersStore";
import StudentsStore from "./Store/StudentsStore";
import {Server} from "miragejs";
import IUser from "./Model/Interface/IUser";
import Requests from "./Api/Requests";
import Role from "./Model/Enum/Role";
import Order from "./Model/Order/Order";
import MealCategory from "./Model/Enum/MealCategory";


new Server({
    routes() {
        this.namespace = "";

        this.get<IUser>(Requests.User, () => {

            return {username: "крутой чел", first_name: "Лео", middle_name: "маоч", last_name: "vandal", role: Role.Parent}
        })

        this.get<Order[]>("/orders/?limit=2&offset=0", () => {
            return [
                {
                    id: 1,
                    student: {last_name: "Черт", middle_name: "Великий", first_name: "Артур", grade: "10"},
                    date_ordered: Date.prototype,
                    order_date: Date.prototype,
                    order_items: [{
                        quantity: 2,
                        data_added: Date.prototype,
                        product: {
                            price: 100,
                            image: "https://kartinkin.net/uploads/posts/2021-04/1617969116_30-p-mech-kladenets-fentezi-32.jpg",
                            grams: 30,
                            name: "золотой меч"
                        }
                    },
                    ],
                    meal_category: MealCategory.dinner
                },
                {
                    id: 1,
                    student: {last_name: "Черт", middle_name: "Великий", first_name: "Артур", grade: "10"},
                    date_ordered: new Date(),
                    order_date: new Date(),
                    order_items: [{
                        quantity: 2,
                        data_added: new Date(),
                        product: {
                            price: 100,
                            image: "https://kartinkin.net/uploads/posts/2021-04/1617969116_30-p-mech-kladenets-fentezi-32.jpg",
                            grams: 30,
                            name: "золотой меч"
                        }
                    },
                    ],
                    meal_category: MealCategory.dinner
                }
            ];
        });
    }
})
// выше это мока, пока так, ибо мне лень и это все равно работает криво



const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

// strict.mode убран!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! ВАЖНО ОЧЕНЬ ВАЖНО
root.render(
    <Provider authStore={new AuthStore()} userStore={new UserStore()} orderStore={new OrdersStore()}
              studentStore={new StudentsStore()}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>

    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
