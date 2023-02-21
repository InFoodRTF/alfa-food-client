import React from "react";
import {Link} from "react-router-dom";
import httpPages from "../Pages/HttpPages";

class Header extends React.Component {


    render() {
        return (
            <div>
                <nav>
                    <Link to={httpPages.Orders}>Заказы   </Link>
                    <Link to={httpPages.Profile}>профайл</Link>
                </nav>
            </div>
        );
    }
}
export default Header;