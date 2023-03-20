import dayjs from "dayjs";
import React from "react";
import styles from "./Calendar.module.css"
import {Image} from "react-bootstrap";
import calendarIcon from "./Vector.png";
import CalendarSwitch from "../../Model/CalendarSwitch";
import {observer} from "mobx-react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

@observer
class CalendarView extends React.Component<{ calendar: CalendarSwitch }> {

    render() {
        return (
            <div>
                <div className={styles.blockDate}>
                    <p className={styles.textDate}>
                        <button
                            className={styles.Ignore}
                            onClick={() => this.props.calendar.ChangeOpen()}>{dayjs(this.props.calendar.Date).format('DD.MM.YYYY')} </button>
                    </p>
                    <button className={styles.Ignore} onClick={() => this.props.calendar.ChangeOpen()}><Image
                        src={calendarIcon} className={styles.blockImage}></Image></button>
                </div>
                {this.props.calendar.IsOpen && <Calendar onChange={(e: Date) => this.props.calendar.ChangeDate(e)}
                                                         value={this.props.calendar.Date}/>
                }
            </div>
        );
    }
}

export default CalendarView
