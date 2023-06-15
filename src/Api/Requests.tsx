
let api = "/api/"

class Requests { // ухх, это выглядит все сложнее и сложнее)))
    GetTokenByUser = api + "auth/login/";
    User = api + "user/";
    Orders = api + "orders/";
    GetStudents = api + "students/";
    GetCart = api + `cart/`;
    AddProductInCart = api + `cart/add/`;
    RemoveProductFromCart = api + `cart/remove/`;
    GetGrades = api + `grades/`;
    CreateOrder = api +`/cart/create-order/`;
    ChangeAttendances = (id: number) =>  api + `attendances/student/${id}/`
    GetMenu = (date: string) => api + `menu/?date=${date}`
    SwitchCart = (studentId: number, date: string) => api + `cart/?menu_date=${date}&student_id=${studentId}`;
    GetAttendancesStudent = (gradeName: string, mealCategory: string, date: string) => api + `attendances/?grade=${gradeName}&meal_category=${mealCategory}&date=${date}`
}

// новая версия
export class CookerHttp {
    static GetMenuByDate = (date: string) => api + `menu/list/?date=${date}`;
    static GetProductByMenu = (menuId: string) => api + `menu/${menuId}/`;
    static GetAvailableItem = api + "products/-"
    static RemoveProduct = api + "menu/item/remove/";
    static DownLoadFile = api + "report/"
    static AddProductInMenu: string = api + "menu/item/add/"

}
export default new Requests();