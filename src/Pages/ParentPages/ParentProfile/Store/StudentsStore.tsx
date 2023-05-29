import StoreAdapterApi from "../../../../Api/StoreAdapterApi";
import {action, makeObservable, observable} from "mobx";
import Grade from "./Grade";
import Toggle from "../../../../Model/Toggle";
import {IStudent} from "./IStudent";
import Requests from "../../../../Api/Requests";

class StudentsStore extends StoreAdapterApi {
    @observable
    public Students: IStudent[] = [];
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
        this.Students = await this.getDataByToken<IStudent[]>(Requests.GetStudets);
    }


    @action
    async LoadInfoGrade(name: string): Promise<void> {
        this.Grades[name] = await this.getDataByToken<Grade>(Requests.GetGrades + `${name}`);
        this.Toggle[name] = new Toggle();  // официально - это самый лютый кринж который я делал, название функций делает ваще другое все каой тугл зочем он здесь? ватт?
        console.log(`${this.Grades[name].name}`)
    }
}

export default StudentsStore
