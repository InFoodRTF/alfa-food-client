import React from "react";
import styles from "./TeacherStyles.module.css";
import {TickCard} from "./Component/TickCard/TickCard";
import {SearchCard} from "./Component/SearchCard/SearchCard";
import {BaseButItem} from "../../../componets/BaseButton/BaseButItem";
import {inject, observer} from "mobx-react";
import {GradesStore} from "./Store/GradesStore";
import LeftMenu, {ClickChange} from "../../../componets/LeftMenuItem/LeftMenu";
import {PageComponent} from "../../PageComponent";

interface InjectProps {
    gradesStore: GradesStore
}

@inject("gradesStore")
@observer
export class MarkGrades extends PageComponent<InjectProps> {

    async componentDidMount() {
        await this.injected.gradesStore.getGrades();
    }

    GetGrades(): ClickChange[] {
        let result: ClickChange[] = []
        for (let key in this.injected.gradesStore.grades) {
            result.push({text: `${key} класс`, choseToChange: key})
        }
        console.log("ататат")
        return result;
    }

    render() {
        let {gradesStore} = this.injected;
        return (
            <body style={{background: "#F8F8F8"}}>
            <div style={{
                display: "flex",
                flexDirection: "row",
                gap: "20px",
                width: "1119px",
                marginTop: "70px",
                marginLeft: "auto",
                marginRight: "auto",
                paddingBottom: "auto",
                minHeight: "580px"
            }}>
                <LeftMenu calendar={gradesStore.calendar} ButtonsText={this.GetGrades()} onChangeButtons={async (e) => {
                    gradesStore.changeSelectGrade(e)
                    await gradesStore.LoadGrade()
                }} onChangeCalendar={async () => {
                    await gradesStore.LoadGrade();
                }} canDataChange={true}/>
                <div style={{display: "flex", flexDirection: "column", gap: "20px"}}>
                    <p className={styles.markGrade}>Отметить класс</p>
                    <div style={{display: "flex", flexDirection: "column", gap: "20px"}}>
                        <SearchCard/>
                        {gradesStore.GetSelectedGradeStudent.map(student =>
                            <TickCard key={student.student!.id} studentAttend={student} onChange={() => gradesStore.changeMarkAttendance(student)} />)}

                        <div style={{width: "642px", paddingTop: "10px", textAlign: "center"}}>
                            <BaseButItem onClick={() => console.log("сохраняем")} w={218} h={39} text={"Сохранить изменения"}/>
                        </div>
                    </div>
                </div>
            </div>
            </body>
        )
    }
}
