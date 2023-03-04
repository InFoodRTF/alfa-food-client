import BaseStoreToken from "./BaseStoreToken";
import {action, makeObservable, observable} from "mobx";
import Student from "../Model/Student";
import Grade from "../Model/Grade";

class StudentsStore extends BaseStoreToken {
    @observable
    public Students: Student[] = []; // думать и только думать, как сделать это красиво
    @observable
    public Grades: { [id: string]: Grade; } = {};
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
  /*      console.log(`Я здесь${this.Students[id].grade}`)
        const result: Grade = await this.GetData<Grade>(`/grades/?name=${this.Students[id].grade}`);

        console.log(result.meal_time.meal_category) // жопа мягко говоря, но да ладно

        console.log(`${this.Grades[0]}`)*/
    }
}

export default StudentsStore