import dayjs from "dayjs";
import React, {ChangeEvent} from "react";
import styles from "./Calendar.module.css"
import {Image} from "react-bootstrap";
import calendarIcon from "./Vector.png";
import CalendarSwitch from "../../Model/CalendarSwitch";
import {observer} from "mobx-react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import ModalView from "../../../../../componets/ModalView/ModalConfirmChange";


interface Props {
    calendar: CalendarSwitch,
    onDataChange: () => void,
    canDataChange: boolean
    modalIsActive: boolean
}

@observer
class CalendarView extends React.Component<Props, { showModal: boolean }> {

    constructor(props: Readonly<Props> | Props) {
        super(props);
        this.state = {showModal: false}
    }

    async ChangeData(date: Date) {
        this.props.calendar.ChangeDate(date);

        await this.props.onDataChange();
    }

    render() {
        return (
            <div>
                <div className={styles.blockDate}>
                    <p className={styles.textDate}>
                        <button
                            className={styles.Ignore}
                            onClick={() => {
                                if (this.props.canDataChange)
                                    this.props.calendar.ChangeOpen()
                                else
                                    this.setState({showModal: true});
                            }}>
                            {dayjs(this.props.calendar.Date).format('DD.MM.YYYY')}
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
                              onChange={async (e: Date) => await this.ChangeData(e)}
                              value={this.props.calendar.Date}/>
                }
                <ModalView
                    active={this.state.showModal && this.props.modalIsActive}
                    onClose={() => this.setState({showModal: false})}
                    onSubmit={() => {
                        this.props.calendar.ChangeOpen()
                        this.setState({showModal: false})
                    }}>
                    <span>вы уверены, корзину будет очищена</span>
                </ModalView>
            </div>
        );
    }
}

export default CalendarView
