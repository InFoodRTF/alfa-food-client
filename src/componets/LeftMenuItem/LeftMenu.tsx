import React from "react";
import LeftButtonItem from "./LeftButtonItem";
import CalendarView from "../../Pages/PagesParent/ProductMenu/Component/Calendar/CalendarView";
import CalendarSwitch from "../../Pages/PagesParent/ProductMenu/Model/CalendarSwitch";


// здесь штука с операторами, ? ! с календарём
export interface ClickChange { // todo выглядит как лютый костыль, но пока и так сойдёт
    text: string;
    choseToChange: string;
}

class LeftMenu extends React.Component<{
    calendar?: CalendarSwitch,
    ButtonsText: ClickChange[],
    onChangeButtons: (e: string) => void,
    onChangeCalendar: () => void,
    canDataChange: boolean
}> {
    render() {
        return (
            <div style={{display: "flex", flexDirection: "column", gap: "52px"}}>
                <CalendarView calendar={this.props.calendar!}
                              onDataChange={() => this.props.onChangeCalendar()}
                              canDataChange={this.props.canDataChange}
                              modalIsActive={true}
                />
                <div style={{display: "flex", flexDirection: "column", gap: "20px"}}>

                    {this.props.ButtonsText.map(button =>
                        <LeftButtonItem key={button.text} w={265} h={49} student={button.text}
                                        onDataChange={() => this.props.onChangeButtons(button.choseToChange)}
                                        canDataChange={this.props.canDataChange}/>)}
                </div>
            </div>

        )
    }
}

export default LeftMenu
