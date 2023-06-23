import StoreAdapterApi from "../../Api/StoreAdapterApi";
import {action, makeObservable, observable} from "mobx";
import Requests from "../../Api/Requests";
import {IStudent} from "./IStudent";
import Grade from "./Grade";

class StudentsStore extends StoreAdapterApi {
    @observable
    public Students: IStudent[] = [];
    @observable
    public Grades: { [id: string]: Grade; } = {};

    constructor() {
        super();
        makeObservable(this);
    }

    @action
    async LoadStudent(): Promise<void> {
        this.Students = await this.getDataByToken<IStudent[]>(Requests.GetStudents);
    }


    @action
    async LoadInfoGrade(name: string): Promise<void> { // название делаеть другое, и воощбе хз, что делает
        this.Grades[name] = await this.getDataByToken<Grade>(Requests.GetGrades + `${name}`);
        console.log(`${this.Grades[name].name}`)
    }
}

export default StudentsStore
