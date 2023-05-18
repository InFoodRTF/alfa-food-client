
class Requests {
    GetTokenByUser = "auth/login/";
    User = "/user/";
    Orders = "/orders/";
    GetStudets = "/students/";
    FoodCards = "/Food";
    GetCart = `/cart/`;
    AddProductInCart = `/cart/add/`
      RemoveProductFromCart =  `/cart/remove/`;
    GetMenu = (date: string) => `/menu/?date=${date}`
    SwitchCart = (studentId: number, date: string) => `/cart?menu_date=${date}&student_id=${studentId}`;
}

export default new Requests();
