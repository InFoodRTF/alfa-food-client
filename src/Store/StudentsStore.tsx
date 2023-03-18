import StoreTokenBase from "./StoreTokenBase";
import {action, makeObservable, observable} from "mobx";
import Student from "../Model/Student";
import Grade from "../Model/Grade";
import Toggle from "../Model/Toggle";

class StudentsStore extends StoreTokenBase {
    @observable
    public Students: Student[] = [];
    @observable
    public Grades: { [id: string]: Grade; } = {};
    @observable                                   // четё ваще выгдяит кринжово // моэйби какой-нибудь общий класс? типа аккордион бла бла
    public Toggle: { [id: string]: Toggle; } = {};

    constructor() {
        super();
        makeObservable(this);
    }

    @action
    async LoadStudent(): Promise<void> {
        this.Students = await this.GetData<Student[]>("/students/");
    }


    @action
    async LoadInfoGrade(name: string): Promise<void> {
        const result: Grade = await this.GetData<Grade>(`/grades/${name}`);
        this.Grades[name] = result
        this.Toggle[name] = new Toggle();  // официально - это самый лютый кринж который я делал, название функций делает ваще другое все каой тугл зочем он здесь? ватт?
        console.log(`${this.Grades[name].name}`)
    }
}

export default StudentsStore