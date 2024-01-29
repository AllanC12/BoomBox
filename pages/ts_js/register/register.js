"use strict";
const btnLogin = document.querySelector(".link-login");
const titlePageRegister = document.title;
class Register {
    defineRoute(page) {
        location.href = location.href.replace('register', page);
        console.log(location.href);
    }
}
const register = new Register();
btnLogin.addEventListener('click', () => {
    register.defineRoute('login');
});
console.log('teste');
