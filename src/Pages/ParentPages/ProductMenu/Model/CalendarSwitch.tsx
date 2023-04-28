import {action, makeAutoObservable, makeObservable, observable} from "mobx";

export default class CalendarSwitch {
    @observable
    Date: Date = new Date();
    @observable
    IsOpen: boolean = false;

    constructor() {
        makeObservable(this)
    }

    @action
    ChangeOpen(): void {
        console.log('меняю')
        this.IsOpen = !this.IsOpen
        console.log(this.IsOpen)
    }

    @action
    ChangeDate(date: Date): void {
        console.log(date)
        this.Date = date;
    }
}