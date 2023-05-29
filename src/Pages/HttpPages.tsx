const baseUrl = ""
class HttpPages {
    Profile: string = baseUrl + "/Profile"
    Orders: string = baseUrl + "/Orders"
    Login: string = baseUrl +  "/login"
    //Auth: string = baseUrl + "/*"
    NotFound: string = baseUrl + "/NotPages";
    Products: string = baseUrl + '/Products'
    MyClass: string = baseUrl + "/myClasses"
    UploadData: string = baseUrl + "/UploadData"
    CreateMenu: string = baseUrl +  "Menus"
}

export default new HttpPages();