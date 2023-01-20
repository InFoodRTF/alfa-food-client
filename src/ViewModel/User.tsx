import React from "react";
import {action, makeAutoObservable, observable} from "mobx";


export default class User {
    @observable
    username: string = ''
    @observable
    password: string = ''

    constructor() {
        makeAutoObservable(this)
    }

    @action
    ChangeName(name: string){
        this.username = name;
    }

    @action
    ChangePassword(password: string){
        this.password = password;
    }

    CheckInServer(){

    }
}