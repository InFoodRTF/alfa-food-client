class Requests { // ухх, это выглядит все сложнее и сложнее)))
    GetTokenByUser = "/api/auth/login/";
    User = "/api/user/";
    Orders = "/api/orders/";
    GetStudets = "/api/students/";   //пропустил N в GetStudeNts
    FoodCards = "/Food";
    GetCart = `/api/cart/`;
    AddProductInCart = `/api/cart/add/`;
    RemoveProductFromCart = `/api/cart/remove/`;
    GetGrades = `/api/grades/`;
    GetMenu = (date: string) => `/api/menu/?date=${date}`
    SwitchCart = (studentId: number, date: string) => `/api/cart?menu_date=${date}&student_id=${studentId}`;
    GetAttendancesStudent = (gradeName: string, mealCategory: string, date: string) => `/api/attendances/?grade=${gradeName}&meal_category=${mealCategory}&date=${date}`
}

export default new Requests();
