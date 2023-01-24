import React from "react";
import {action, makeAutoObservable, makeObservable, observable, override} from "mobx";
import UserServer from "./ServerWork/UserWorkServer";


export default class User extends UserServer{
    username: string = ''
    password: string = ''

    constructor() {
        super()
        makeObservable(this, {
            username: override,
            password: override,
            ChangeName: action,
            ChangePassword: action
        })
    }

    ChangeName(name: string){
        this.username = name;
    }

    ChangePassword(password: string){
        this.password = password;
    }
}