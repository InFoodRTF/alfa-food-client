import {action, computed, makeObservable, observable} from "mobx";

export default class CalendarSwitch {
    @observable
    Date: Date = new Date();
    @observable
    IsOpen: boolean = false;
    constructor() {
        makeObservable(this)
    }

    @computed
    get CurDate() {
        return this.Date.toLocaleString().split(',')[0];
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