import React from "react";
import buttonStyles from "../Components/BaseButton/BaseButItem.module.css";
import CalendarView from "../ParentPages/ProductMenu/Component/Calendar/CalendarView";
import {inject} from "mobx-react";
import {MenuStore} from "./Store/MenuStore";
import calendarView from "../ParentPages/ProductMenu/Component/Calendar/CalendarView";
import { BaseButItem } from "../../componets/BaseButton/BaseButItem";
import {FilterFoodItem} from "../ParentPages/ProductMenu/Component/FilterFoodItem/FilterFoodItem";

type props = {
    menuStore: MenuStore;
}
/*

@inject("menuStore")
export class CookingPage extends React.Component{
    get injected() {
        return this.props as props;
    }

    render() {
        let {menuStore} = this.injected;
        return (
            <body style={{background:"#F8F8F8"}}>
            <div style={{
                display: "flex",
                flexDirection: "row",
                gap: "20px",
                width: "1119px",
                marginTop: "26px",
                marginLeft: "auto",
                marginRight: "auto",
                paddingBottom: "60px",
                minHeight: "580px"
            }}>
                <div style={{display: "flex", flexDirection: "column", gap: "39px"}}>
                    <CalendarView calendar={menuStore.Calendar} />
                    <div style={{display: "flex", flexDirection: "column", gap: "26px", paddingTop: "2.5px"}}>
                        <BaseButItem w={264} h={44} style={buttonStyles.cardButton} text={"Добавить новое меню"}/>
                        <LeftMenuCooking/>
                        <BaseButItem w={264} h={44} style={buttonStyles.cardButton} text={"Изменить"}/>
                    </div>
                </div>
                <div style={{display: "flex", flexDirection: "column", gap: "23px"}}>
                    <div style={{display: "flex", flexDirection: "column", gap: "18px"}}>
                        <InputCook/>
                        <div style={{display: "flex", flexDirection: "row", gap: "20px"}}>
                            <FilterFoodItem/>
                            <BaseButItem w={208} h={44} style={buttonStyles.cardButton} text={"Добавить категорию"}/>
                        </div>
                    </div>
                    <div style={{display: "flex", flexDirection: "row", gap: "20px", paddingTop: "2.5px"}}>
                        <CreatingCard/>
                        <EditingCard/>
                        <EditingCard/>
                    </div>
                </div>
            </div>
            <FooterCooking firstButtonText={"Составить меню"} secondButtonText={"Добавить блюдо"} thirdButtonText={"Выгрузить отчет"}/>
            </body>
        )
    }
}
*/
