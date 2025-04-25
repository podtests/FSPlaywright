export default class SuccessOutputDao {

    private email: string;
    constructor(email : string) {
        this.email = email;
    }

    public getEmail() {
        return this.email;
    }
}