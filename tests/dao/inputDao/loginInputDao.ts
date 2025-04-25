import { LoginDataLayer } from "../../dataControllerLayer/loginDataLayer";

export default class LoginInputDao {
    private username: string;
    private password: string;

    constructor(loginDataLayer: LoginDataLayer) {
        this.username = loginDataLayer.username;
        this.password = loginDataLayer.password;
    }

    public getUserName() {
        return this.username;
    }

    public getPassword() {
        return this.password;
    }
}