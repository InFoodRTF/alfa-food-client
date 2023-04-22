import {makeAutoObservable} from "mobx";

export default class CalendarSwitch {
    Date: Date = new Date();
    IsOpen: boolean = false;

    ChangeOpen(): void {
        console.log('меняю')
        this.IsOpen = !this.IsOpen
        console.log(this.IsOpen)
    }

    constructor() {
        makeAutoObservable(this)
    }

    ChangeDate(date: Date): void {
        console.log(date)
        this.Date = date;
    }
}