import React from "react";
import CalendarView from "../../PagesParent/ProductMenu/Component/Calendar/CalendarView";
import {inject, observer} from "mobx-react";
import {AssembleStore} from "./Store/AssembleStore";
import {BaseButItem} from "../../../componets/BaseButton/BaseButItem";
import {MealCategoryFilter} from "../../PagesParent/ProductMenu/Component/FilterFoodItem/MealCategoryFilter";
import {PageComponent} from "../../PageComponent";
import {LeftMenuCooking} from "../../../componets/LeftMenuCooking/LeftMenuCooking";
import {InputCook} from "../../../componets/InputFieldCooking/InputCook";
import {CreatingCard} from "../../../componets/CreatingFoodCard/CreatingCard";
import {EditingCard} from "../../../componets/EditingFoodCard/EditingCard";
import ModalView from "../../../componets/ModalView/ModalConfirmChange";
import {ChooseProductAdd} from "../../../componets/ChooseProductAdd/ChooseProductAdd";

type props = {
    menuStore: AssembleStore;
}

// todo <BaseButItem w={264} h={44} text={"Изменить"}/> сделать, так, чтоб можно было через chicldrenWithProps все делать!
@inject("menuStore")
@observer
export class AssembleMenu extends PageComponent<props> {

    async componentDidMount() {
        await this.injected.menuStore.downloadAvailableMenu();
        await this.injected.menuStore.DownloadMenu();
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
                                      await menuStore.downloadAvailableMenu();
                                      await menuStore.DownloadMenu();
                                  }}/>
                    <div style={{display: "flex", flexDirection: "column", gap: "26px", paddingTop: "2.5px"}}>
                        <BaseButItem onClick={() => console.log("добавляем")} w={264} h={44}
                                     text={"Добавить новое меню"}/>
                        {
                            menuStore.Menus !== undefined && menuStore.Menus.map(menu => <LeftMenuCooking
                                onClick={async () => {
                                    menuStore.ChangeSelectedMenu(menu.id)
                                    await menuStore.DownloadMenu();
                                }} menu={menu} key={menu.id}/>)}
                        <BaseButItem onClick={() => console.log("меняем")} w={264} h={44} text={"Изменить"}/>
                    </div>
                </div>
                <div style={{display: "flex", flexDirection: "column", gap: "23px"}}>
                    <div style={{display: "flex", flexDirection: "column", gap: "18px"}}>
                        <InputCook/>
                        <div style={{display: "flex", flexDirection: "row", gap: "20px"}}>
                            {
                                menuStore.GetAvailableCategory.map(mealCategory =>
                                    <MealCategoryFilter value={mealCategory}
                                                        changeMealCategory={() => menuStore.ChangeMealCategory(mealCategory)}
                                                        selectedCategory={menuStore.SelectedMealCategory ?? ""}/>)
                            }
                            <BaseButItem onClick={() => console.log("добавляем категорию")} w={208} h={44}
                                          text={"Добавить категорию"}/>
                        </div>
                    </div>

                    <div style={{display: "flex", flexDirection: "column", gap: "20px", paddingTop: "2.5px"}}>

                        {
                            menuStore.ShowProduct()
                                .map((itemColumn) => <div style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    gap: "20px"
                                }}> {itemColumn
                                    .map(item => <EditingCard key={item.id} item={item} onCLickMinus={() => {
                                        menuStore.removeFromMenu(item)
                                    }} onCLickPlus={() => {
                                        menuStore.addInMenu(item)
                                    }}/>)
                                }
                                    {itemColumn.length !== 3 && <CreatingCard onClick={() => {
                                        menuStore.DownloadAvailableProduct()
                                        menuStore.ChangeIsOpen();
                                    }}/>}
                                    {menuStore.ShowProduct().pop()?.length === 3 && <CreatingCard onClick={() => {
                                        menuStore.DownloadAvailableProduct()
                                        menuStore.ChangeIsOpen();
                                    }}/>}
                                </div>)

                        }

                    </div>
                    <ModalView active={menuStore.IsOpenAllProductMenu} onClose={() => menuStore.ChangeIsOpen()}
                               onSubmit={console.log}>
                        <ChooseProductAdd products={menuStore.AvailableIProduct}
                                          onClick={(p) => menuStore.addInMenuNew(p.id)}/>
                    </ModalView>
                </div>
            </div>
            </body>
        )
    }
}
