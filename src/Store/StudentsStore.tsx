import StoreTokenBase from "./StoreTokenBase";
import {action, makeObservable, observable} from "mobx";
import Student from "../Model/Student";
import Grade from "../Model/Grade";
import toggle from "../Model/Toggle";

class StudentsStore extends StoreTokenBase {
    @observable
    public Students: Student[] = []; // думать и только думать, как сделать это красиво
    @observable
    public Grades: { [id: string]: Grade; } = {};
    @observable
    public Toggle: toggle[] = []
    constructor() {
        super();
        makeObservable(this);
    }

    @action
    async LoadStudent(): Promise<void> {
        this.Students = await this.GetData<Student[]>("/students/"); // вся надежда на dict
    }



    @action
    async LoadInfoGrade(name: string): Promise<void> {
        const result: Grade = await this.GetData<Grade>(`/grades/${name}`);
        this.Grades[name] = result // жопа мягко говоря, но да ладно

        console.log(`${this.Grades[name].name}`)
    }
}

export default StudentsStore