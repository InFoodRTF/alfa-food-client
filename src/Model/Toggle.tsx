
import {action, makeAutoObservable, observable} from "mobx";

class Toggle {
    @observable
    IsOpen: boolean = false;

    constructor() {
        makeAutoObservable(this)
    }

    @action
    ChangeToggle(): void {
        this.IsOpen = !this.IsOpen
    }
}

export default Toggle;