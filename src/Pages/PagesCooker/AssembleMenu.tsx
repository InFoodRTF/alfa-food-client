import React from "react";
import CalendarView from "../PagesParent/ProductMenu/Component/Calendar/CalendarView";
import {inject, observer} from "mobx-react";
import {MenuStore} from "./Store/MenuStore";
import {BaseButItem} from "../../componets/BaseButton/BaseButItem";
import {MealCategoryFilter} from "../PagesParent/ProductMenu/Component/FilterFoodItem/MealCategoryFilter";
import {PageComponent} from "../PageComponent";
import {LeftMenuCooking} from "../../componets/LeftMenuCooking/LeftMenuCooking";
import {InputCook} from "../../componets/InputFieldCooking/InputCook";
import {CreatingCard} from "../../componets/CreatingFoodCard/CreatingCard";
import {EditingCard} from "../../componets/EditingFoodCard/EditingCard";
import mealCategory from "../../Model/Enum/MealCategory";

type props = {
    menuStore: MenuStore;
}

// todo <BaseButItem w={264} h={44} text={"Изменить"}/> сделать, так, чтоб можно было через chicldrenWithProps все делать!
@inject("menuStore")
@observer
export class AssembleMenu extends PageComponent<props> {

    async componentDidMount() {
        await this.injected.menuStore.loadAvailableMenu();
        await this.injected.menuStore.LoadMenu();
    }

    render() {
        let {menuStore} = this.injected;
        return (
            <body style={{background: "#F8F8F8"}}>
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
                    <CalendarView calendar={menuStore.Calendar} modalIsActive={true} canDataChange={true}
                                  onDataChange={async () => {
                                      await menuStore.loadAvailableMenu();
                                      await menuStore.LoadMenu();
                                  }}/>
                    <div style={{display: "flex", flexDirection: "column", gap: "26px", paddingTop: "2.5px"}}>
                        <BaseButItem w={264} h={44} text={"Добавить новое меню"}/>
                        {menuStore.Menus.map(menu => <LeftMenuCooking onClick={() => {
                            menuStore.ChangeSelectedMenu(menu.id)
                            menuStore.LoadMenu();
                        }} menu={menu} key={menu.id}/>)}
                        <BaseButItem w={264} h={44} text={"Изменить"}/>
                    </div>
                </div>
                <div style={{display: "flex", flexDirection: "column", gap: "23px"}}>
                    <div style={{display: "flex", flexDirection: "column", gap: "18px"}}>
                        <InputCook/>
                        <div style={{display: "flex", flexDirection: "row", gap: "20px"}}>
                            {
                                menuStore.GetAvailableCategory.map(mealCategory =>
                                    <MealCategoryFilter value={mealCategory}
                                                        changeMealCategory={() => menuStore.ChangeMealCategory(mealCategory)}/>)
                            }<BaseButItem w={208} h={44} text={"Добавить категорию"}/>
                        </div>
                    </div>
                    <div style={{display: "flex", flexDirection: "row", gap: "20px", paddingTop: "2.5px"}}>
                        {
                            menuStore.ShowProduct()
                                .map((itemColumn) => itemColumn
                                    .map(item => <EditingCard key={item.id} product={item}/>))
                        }
                        <CreatingCard/>
                    </div>
                </div>
            </div>
            </body>
        )
    }
}
