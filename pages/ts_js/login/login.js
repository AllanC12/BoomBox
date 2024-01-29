"use strict";
const btnRegister = document.querySelector(".link-register");
const titlePagelogin = document.title;
class Login {
    defineRoute(page) {
        location.href = location.href.replace(titlePagelogin.toLowerCase(), page);
    }
}
const login = new Login();
btnRegister.addEventListener('click', () => {
    login.defineRoute('register');
});
