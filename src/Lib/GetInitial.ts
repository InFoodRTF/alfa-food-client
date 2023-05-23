import {IPerson} from "../Model/Interface/IPerson";

export function getInitial(person: IPerson) : string {
    return `${person.middle_name} ${person.first_name[0]}. ${person.last_name[0]}`
}