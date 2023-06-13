import React from "react";
import buttonStyles from "../Components/BaseButton/BaseButItem.module.css";
import CalendarView from "../../PagesParent/ProductMenu/Component/Calendar/CalendarView";
import { BaseButItem } from "../../../componets/BaseButton/BaseButItem";
import {inject, observer} from "mobx-react";
import {PageComponent} from "../../PageComponent";
import {MenuStore} from "../AssembleMenu/Store/MenuStore";
import styles from "./CookingUploadRep.module.css"
import {ReportStore} from "./Store/ReportStore";
import InputTemplate from "mdb-react-ui-kit/dist/types/free/forms/InputTemplate/InputTemplate";

type injprops = {
    reportStore: ReportStore;
}
@inject("reportStore")
@observer
export class CookingUploadRep extends PageComponent<injprops>{
    render() {

        const {reportStore} = this.injected;
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
                <div style={{display: "flex", flexDirection: "row", gap: "47px"}}>
                    <CalendarView calendar={reportStore.Calendar} canDataChange={false} onDataChange={() => console.log()} modalIsActive={false}/>
                    <div style={{display: "flex", flexDirection: "column", gap: "39px"}}>
                        <div style={{display: "flex", flexDirection: "column", gap: "42px"}}>
                            <p className={styles.report}>Выгрузить отчет</p>
                            <div style={{width: "845px", height: "233px", background: "#D9D9D9"}}></div>
                        </div>
                        <div>
                            <BaseButItem onClick={() => reportStore.DownLoadFile()} w={172} h={39} text={"Скачать данные"}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
