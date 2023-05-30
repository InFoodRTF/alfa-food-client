import StoreAdapterApi from "../../../Api/StoreAdapterApi";
import CalendarSwitch from "../../ParentPages/ProductMenu/Model/CalendarSwitch";


export class MenuStore extends StoreAdapterApi{
    Calendar: CalendarSwitch;

    constructor(caledar: CalendarSwitch) {
        super();
        this.Calendar = caledar;
    }


}