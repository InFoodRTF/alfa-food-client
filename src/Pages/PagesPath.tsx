const baseUrl = ""
class PagesPath {
    Profile: string = baseUrl + "/profile"
    Orders: string = baseUrl + "/orders"
    Login: string = baseUrl +  "/login"
    //Auth: string = baseUrl + "/*"
    NotFound: string = baseUrl + "/notPages";
    Products: string = baseUrl + '/Products'
    MyClass: string = baseUrl + "/myClasses"
    UploadData: string = baseUrl + "/uploadData"
    CreateMenu: string = baseUrl +  "/menus"
}

export default new PagesPath();