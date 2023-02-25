import React from "react";
import BaseStoreToken from "./BaseStoreToken";
import {action, observable} from "mobx";
import Student from "../Model/Student";

class StudentsStore extends BaseStoreToken{
    @observable
    public Students: Student[] = []
    @observable
    public Grades = []

    @action
    async LoadStudent(): Promise<void>{
        this.Students =  await this.GetFromServer<Student[]>("/students/");
    }
}