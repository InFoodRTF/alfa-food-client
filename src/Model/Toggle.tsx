import React from "react";
import {action, makeAutoObservable, observable} from "mobx";

class Toggle {
    @observable
    IsOpen: string = '';

    constructor() {
        makeAutoObservable(this)
    }

    @action
    ChangeToggle(): void {
        this.IsOpen += "A"
        console.log(this.IsOpen)
    }
}

export default Toggle;