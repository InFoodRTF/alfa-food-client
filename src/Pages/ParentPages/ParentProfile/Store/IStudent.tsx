import {IPerson} from "../../../../Model/Interface/IPerson";

export interface IStudent extends IPerson{
    id: number;
    last_name: string;
    first_name: string;
    middle_name: string;
    grade: string;
}

