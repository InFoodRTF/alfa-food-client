import React from "react";
import styles from "./TeacherStyles.module.css";
import { TickCard } from "./Component/TickCard/TickCard";
import { SearchCard } from "./Component/SearchCard/SearchCard";
import { BaseButItem } from "../../../componets/BaseButton/BaseButItem";
import {inject} from "mobx-react";
import {GradesStore} from "./Store/GradesStore";

// TODO здесь стор с учениками этого преподавателя. <LeftMenu/> - это я убрал
// <LeftMenu calendar={gradesStore.calendar} ButtonsTextChange={} onChange={} onDataUpdate={}/>
inject("gradesStore")
interface injectProps {
    gradesStore: GradesStore
}
export class MarkGrades extends React.Component {

    get injected () {
        return this.props as injectProps;
    }
    componentDidMount() {

    }

    render() {
        let {gradesStore} = this.injected;
        return (
                <body style={{background:"#F8F8F8"}}>
                    <div style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "20px",
                        width: "1119px",
                        marginTop: "70px",
                        marginLeft: "auto",
                        marginRight: "auto"
                    }}>

                        <div style={{display: "flex", flexDirection: "column", gap: "20px"}}>
                            <p className={styles.markClass}>Отметить класс</p>
                            <div style={{display: "flex", flexDirection: "column", gap: "20px"}}>
                                <SearchCard/>
                                <TickCard/>
                                <TickCard/>
                                <div style={{width: "642px", paddingTop: "10px", textAlign: "center"}}>
                                    <BaseButItem w={218} h={39} text={"Сохранить изменения"}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </body>
        )
    }
}
