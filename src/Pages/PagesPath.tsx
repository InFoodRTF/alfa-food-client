const baseUrl = ""
class PagesPath {
    Profile: string = baseUrl + "/profile"
    Orders: string = baseUrl + "/orders"
    Login: string = baseUrl +  "/login"
    //Auth: string = baseUrl + "/*"
    NotFound: string = baseUrl + "/not-found";
    Products: string = baseUrl + '/Products'
    MyClass: string = baseUrl + "/my-grade"
    UploadData: string = baseUrl + "/upload-data"
    CreateMenu: string = baseUrl +  "/menus"
    UploadReport: string = "/report"
}

export default new PagesPath();