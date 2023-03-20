import {createServer, Response} from "miragejs";
import IUser from "../Model/Interface/IUser";
import Requests from "./Requests";
import Role from "../Model/Enum/Role";
import Order from "../Model/Order/Order";
import MealCategory from "../Model/Enum/MealCategory";
import Grade from "../Pages/UsersMenu/Profile/Parent/Store/Grade";
import {IProduct} from "../componets/FoodCard/CardFood";
import {IStudent} from "../Pages/UsersMenu/Profile/Parent/Store/IStudent";

export default function server(): void {

    createServer({
        routes() {
            this.namespace = "";

            this.get<IUser>(Requests.User, () => {
                return {
                    username: "Пинокио",
                    first_name: "петр",
                    middle_name: "Поповский",
                    last_name: "ласт имя",
                    role: Role.Parent
                }
            })

            this.get<IProduct[]>("/products", () => {
                return [{
                    id: 1,
                    name: "Каша",
                    price: 100,
                    description: "каша вкусная",
                    grams: 200,
                    image: "https://avatars.dzeninfra.ru/get-zen_doc/3401641/pub_5f6c490fd2daf865cca18014_5f6c4933d2daf865cca1bbda/scale_1200",
                    meal_category: 1
                },
                    {
                        id: 2,
                        name: "Каша",
                        price: 100,
                        description: "каша вкусная",
                        grams: 200,
                        image: "https://avatars.dzeninfra.ru/get-zen_doc/3401641/pub_5f6c490fd2daf865cca18014_5f6c4933d2daf865cca1bbda/scale_1200",
                        meal_category: 1
                    },
                    {
                        id: 3,
                        name: "Каша",
                        price: 100,
                        description: "каша вкусная",
                        grams: 200,
                        image: "https://avatars.dzeninfra.ru/get-zen_doc/3401641/pub_5f6c490fd2daf865cca18014_5f6c4933d2daf865cca1bbda/scale_1200",
                        meal_category: 1
                    },

                ]
            })
            this.post(Requests.GetTokenByUser, () => {
                return new Response(200, {}, {token: "faskjdffsd"})
            },)

            this.get<IStudent[]>(Requests.GetStudets, () => {
                return [{
                    id: 1,
                    last_name: "Черт",
                    middle_name: "Великий",
                    first_name: "Артур",
                    grade: "8 Б"
                },
                    {
                        id: 2,
                        last_name: "Черт",
                        middle_name: "Великий",
                        first_name: "Данил",
                        grade: "10"
                    }
                ]
            })


            this.get<Grade>("/grades/?name=8 В", () => {
                return {
                    name: "8 Б",
                    shift: 2,
                    teacher: "valoda",
                    meal_time: [{meal_category: "обед", meal_end: "10", meal_start: "9"}]
                }

            })
            this.get<Order[]>("http://localhost:3000/orders/?limit=2&offset=0", () => { // не работает хз почему
                return [
                    {
                        id: 1,
                        student: {
                            id: 1,
                            last_name: "Черт",
                            middle_name: "Великий",
                            first_name: "Артур",
                            grade: "8 Б"
                        },
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
                        id: 2,
                        student: {
                            id: 2,
                            last_name: "Черт",
                            middle_name: "Великий",
                            first_name: "Артур",
                            grade: "10"
                        },
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

            this.passthrough()
        }
    })
}
