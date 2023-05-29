class Requests { // ухх, это выглядит все сложнее и сложнее)))
    GetTokenByUser = "/auth/login/";
    User = "/user/";
    Orders = "/orders/";
    GetStudets = "/students/";
    FoodCards = "/Food";
    GetCart = `/cart/`;
    AddProductInCart = `/cart/add/`;
    RemoveProductFromCart = `/cart/remove/`;
    GetGrades = `/grades/`;
    GetMenu = (date: string) => `/menu/?date=${date}`
    SwitchCart = (studentId: number, date: string) => `/cart?menu_date=${date}&student_id=${studentId}`;
    GetAttendancesStudent = (gradeName: string, mealCategory: string, date: string) => `/attendances/?grade=${gradeName}&meal_category=${mealCategory}&date=${date}`
}

export default new Requests();
