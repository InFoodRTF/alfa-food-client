import React from "react";
import Navibar from "../../componets/Navbar/Navibar";
import {inject, observer} from "mobx-react";
import ProductsStore from "../../Store/ProductsStore";
import CardFood from "../../componets/FoodCard/CardFood";
import LeftMenu from "../../componets/LeftMenuItem/LeftMenu";
import StudentsStore from "../../Store/StudentsStore";

type props = {
    takeOrderStore: ProductsStore;
    studentStore: StudentsStore;
}

@inject("takeOrderStore", 'studentStore')
@observer
class TakeOrderMenu extends React.Component {
    get injected(): props {
        return this.props as props;
    }

    async componentDidMount() {
        await this.injected.studentStore.LoadStudent();
        await this.injected.takeOrderStore.GetProduct();
    }

    render() {
        let {takeOrderStore, studentStore} = this.injected;
        return (
            <div>
                <Navibar/>
                <LeftMenu calendar={takeOrderStore.Calendar} student={studentStore.Students}/>
                {takeOrderStore.FoodCards.map(food => <CardFood food={food}/>)}
            </div>
        );
    }
}

export default TakeOrderMenu