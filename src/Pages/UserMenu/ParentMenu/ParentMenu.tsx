import React from "react";
import IParent from "../../../Model/Interface/IParent";
import {observer} from "mobx-react";
import "./ParentMenuStyles.css"
import {Link, Route, Routes} from "react-router-dom";
import OrdersMenu from "../../OrdersMenu/OrdersMenu";



@observer
class ParentMenu extends React.Component<{ user: IParent }, any> {



    render() {

        console.log(this.props.user.balance)
        console.log("это меню родителя")
        return (
            <div>
                <Link to={"MyOrders"}>заказы</Link>
                <Routes>
                    <Route path={"MyOrders"} element={<OrdersMenu user={this.props.user}/>}/>
                </Routes>

            </div>
        );
    }
}

export default ParentMenu;