import { accessAccepted } from "../register/register.js";
const btnRedirectRegister = document.querySelector(".link-register");
const titlePagelogin = document.title;
class Login {
    defineRoute(page) {
        location.href = location.href.replace(titlePagelogin.toLowerCase(), page);
    }
}
const login = new Login();
console.log(accessAccepted);
btnRedirectRegister.addEventListener('click', () => {
    login.defineRoute('register');
});
