import {action, makeAutoObservable, observable} from "mobx";
import NotAuthUser from "../Model/Role/NotAuthUser";
import IUser from "../Model/Interface/IUser";
import AuthKey from "../Model/AuthKey";
import IUserApi from "../Api/IUserApi";
import ApiClient from "../Api/ApiClient";
import Student from "../Model/Student";
import Requests from "../Api/Requests";

class UserStore {
    @observable
    public User: IUser = new NotAuthUser();
    @observable
    public Api: IUserApi = new ApiClient();
    @observable
    public Students: Student[] = [];

    constructor() {
        makeAutoObservable(this)
    }

    @action
    async AuthByToken() {
        this.User = await this.Api.GetEntity<IUser>(AuthKey.GetFromLocalStorage(),Requests.GetUser);  // реализация AuthKey напрягает
    }

    @action
    async GetStudents() {
         this.Students = await this.Api.GetEntity<Student[]>(AuthKey.GetFromLocalStorage(), "/students/" )
    }
}

export default UserStore;