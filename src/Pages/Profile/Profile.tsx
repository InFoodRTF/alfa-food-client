import React from "react";
import { Account } from "./component/Account/Account";
import { BaseButItem } from "../../componets/BaseButton/BaseButItem";
import {inject, observer} from "mobx-react";
import {PageComponent} from "../PageComponent";
import UserStore from "../UserStore";
import styles from "./profile.module.css"

type injProps = {
    userStore: UserStore;
}
@inject("userStore")
@observer
export class Profile extends PageComponent<injProps> {


    render() {
        const {userStore} = this.injected;
        console.log("профайл!!")
        return (
            <div style={{
                display: "flex",
                flexDirection: "row",
                gap: "20px",
                width: "1119px",
                marginTop: "70px",
                marginLeft: "auto",
                marginRight: "auto",
                paddingBottom: "60px",
                minHeight: "580px"
            }}>
                <div style={{display: "flex", flexDirection: "column", gap: "20px"}}>
                    <div style={{display: "flex", flexDirection: "column", gap: "60px"}}>
                        <div style={{display: "flex", flexDirection: "column", gap: "30px"}}>
                            <p className={styles.account}>Личный кабинет</p>
                            <div style={{display: "flex", flexDirection: "column", gap: "20px"}}>
                                <Account desc={"Фамилия"} text={userStore.User.first_name}/>
                                <Account desc={"Имя"} text={userStore.User.middle_name}/>
                                <Account desc={"Отчество"} text={userStore.User.last_name}/>
                            </div>
                        </div>
                        <div style={{display: "flex", flexDirection: "column", gap: "20px"}}>
                            <Account text={"нет"} desc={"Почта"} />
                            <Account text={"нет"} desc={"Телефон"}/>
                        </div>
                        <div style={{display: "flex", flexDirection: "column", gap: "20px"}}>
                            <Account desc={"Логин"} text={userStore.User.username}/>
                        </div>
                    </div>
                    <div style={{width: "642px", paddingTop: "10px", textAlign: "center"}}>
                        <BaseButItem onClick={() => console.log("cохраняем")} w={218} h={39} text={"Сохранить изменения"}/>
                    </div>
                </div>
            </div>
        )
    }
}