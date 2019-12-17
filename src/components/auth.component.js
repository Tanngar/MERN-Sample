class Auth {
    constructor() {
        this.isLoggedIn = this.isLoggedIn.bind(this)
    }

    isLoggedIn() {
        return localStorage.getItem('userId');
    }
}
export default Auth;
