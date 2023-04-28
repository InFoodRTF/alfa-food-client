import dayjs from "dayjs";
import React from "react";
import styles from "./Calendar.module.css"
import {Image} from "react-bootstrap";
import calendarIcon from "./Vector.png";
import CalendarSwitch from "../../Pages/ParentPages/ProductMenu/Model/CalendarSwitch";
import {observer} from "mobx-react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

@observer
class CalendarView extends React.Component<{ calendar: CalendarSwitch, loadMenu: () => void }> {

    // TODO этот кринж почему то нормально не работает, prevpros and cur равны!)(90
        async componentDidUpdate(prevProps: Readonly<{

        calendar: CalendarSwitch;
        loadMenu: () => void
    }>, prevState: Readonly<{}>, snapshot?: any) {

        console.log("Я работаююююю" + prevProps.calendar.Date.toLocaleString())
        console.log("Я работаююююю" + this.props.calendar.Date)

        if (prevProps.calendar.Date.toLocaleString() !== this.props.calendar.Date.toLocaleString()) {
            await this.props.loadMenu()
        }
    }

    render() {
        return (
            <div>
                <div className={styles.blockDate}>
                    <p className={styles.textDate}>
                        <button
                            className={styles.Ignore}
                            onClick={() => this.props.calendar.ChangeOpen()}>{dayjs(this.props.calendar.Date).format('DD.MM.YYYY')}
                        </button>
                    </p>
                    <button
                        className={styles.Ignore} onClick={() => this.props.calendar.ChangeOpen()}>
                        <Image src={calendarIcon} className={styles.blockImage}></Image>
                    </button>
                </div>
                {
                    this.props.calendar.IsOpen &&
                    <Calendar className={styles.calendar}
                        onChange={(e: Date) => {this.props.calendar.ChangeDate(e); this.props.loadMenu()}}
                        value={this.props.calendar.Date}/>
                }
            </div>
        );
    }
}

export default CalendarView
